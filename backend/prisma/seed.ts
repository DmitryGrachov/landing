/**
 * One-off migration: reads the legacy frontend/public/gallery-data.json,
 * copies the referenced files into backend/uploads/<category>/..., and
 * inserts one GalleryMedia row per file. Safe to re-run (upserts).
 *
 * The JSON's "gallery" key (feature/works/showcase paths) is dead at
 * runtime — the React app's gallery content comes entirely from this
 * backend's API now — but it's still this script's only source of record
 * for the original files/paths. Don't "clean up" those arrays in the JSON;
 * doing so breaks this migration for anyone re-seeding from scratch.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { MediaType, PrismaClient } from "@prisma/client";
import { getMimeTypeFromExt, getMediaTypeFromMime } from "../src/utils/mime";

const prisma = new PrismaClient();

const FRONTEND_PUBLIC_DIR = process.env.LEGACY_FRONTEND_PUBLIC_DIR
  ? path.resolve(process.env.LEGACY_FRONTEND_PUBLIC_DIR)
  : path.resolve(__dirname, "../../frontend/public");
const LEGACY_JSON_PATH = path.join(FRONTEND_PUBLIC_DIR, "gallery-data.json");
const UPLOADS_DIR = path.resolve(__dirname, "..", process.env.UPLOADS_DIR ?? "uploads");

type LegacyGalleryData = {
  gallery: {
    feature: string[];
    works: string[];
    showcase: string[];
  };
};

// One category per site tab: "Архивиз" (feature/works/showcase used to be
// three separate categories/sections — the site now shows them as a single
// grid, so they live under one "archiviz" category too; original sub-folder
// names are kept via `group` for reference). "video"/"software" have no
// legacy assets to migrate — created empty, ready for the admin app.
const CATEGORY_DEFS: Record<string, { name: string; sortOrder: number; mediaType: MediaType }> = {
  archiviz: { name: "Архивиз", sortOrder: 0, mediaType: MediaType.IMAGE },
  video: { name: "Видео", sortOrder: 1, mediaType: MediaType.VIDEO },
  software: { name: "ПО/UE", sortOrder: 2, mediaType: MediaType.IMAGE },
};

// Categories this project used before feature/works/showcase were merged
// into "archiviz". Cleaned up on seed so re-running against an older
// database converges to the current 3-category layout instead of piling up
// duplicates under both the old and new slugs.
const RETIRED_CATEGORY_SLUGS = ["feature", "works", "showcase"];

async function retireOldArchivizCategories() {
  const retired = await prisma.galleryCategory.findMany({ where: { slug: { in: RETIRED_CATEGORY_SLUGS } } });
  if (retired.length === 0) return;

  console.log(`[seed] merging legacy categories [${retired.map((c) => c.slug).join(", ")}] into "archiviz"`);
  for (const category of retired) {
    fs.rmSync(path.join(UPLOADS_DIR, category.slug), { recursive: true, force: true });
  }
  // Cascades to delete their gallery_media rows too (onDelete: Cascade).
  await prisma.galleryCategory.deleteMany({ where: { slug: { in: RETIRED_CATEGORY_SLUGS } } });
}

function getLegacyPathsForCategory(slug: string, legacyData: LegacyGalleryData): string[] {
  if (slug === "archiviz") {
    return [...legacyData.gallery.feature, ...legacyData.gallery.works, ...legacyData.gallery.showcase];
  }
  return (legacyData.gallery as Record<string, string[] | undefined>)[slug] ?? [];
}

/** "/gallery/works-1/1.jpg" -> { group: "works-1", fileName: "1.jpg" } */
function parseLegacyPath(legacyPath: string, categorySlug: string) {
  const relative = legacyPath.replace(/^\/gallery\//, ""); // "works-1/1.jpg" | "feature/feature-1.webp"
  const segments = relative.split("/");
  const fileName = segments[segments.length - 1];
  const folder = segments.length > 1 ? segments[0] : null;
  const group = folder && folder !== categorySlug ? folder : null;
  return { group, fileName };
}

async function main() {
  if (!fs.existsSync(LEGACY_JSON_PATH)) {
    throw new Error(`Legacy gallery JSON not found at ${LEGACY_JSON_PATH}`);
  }

  const legacyData = JSON.parse(fs.readFileSync(LEGACY_JSON_PATH, "utf-8")) as LegacyGalleryData;

  await retireOldArchivizCategories();

  for (const slug of Object.keys(CATEGORY_DEFS)) {
    const def = CATEGORY_DEFS[slug];
    const category = await prisma.galleryCategory.upsert({
      where: { slug },
      update: { name: def.name, sortOrder: def.sortOrder, mediaType: def.mediaType },
      create: { slug, name: def.name, sortOrder: def.sortOrder, mediaType: def.mediaType },
    });

    const legacyPaths = getLegacyPathsForCategory(slug, legacyData);
    let sortOrder = 0;

    for (const legacyPath of legacyPaths) {
      const { group, fileName } = parseLegacyPath(legacyPath, slug);
      const sourceFile = path.join(FRONTEND_PUBLIC_DIR, legacyPath.replace(/^\//, ""));

      if (!fs.existsSync(sourceFile)) {
        console.warn(`[seed] skipping missing source file: ${sourceFile}`);
        continue;
      }

      const destRelative = group ? path.posix.join(slug, group, fileName) : path.posix.join(slug, fileName);
      const destFile = path.join(UPLOADS_DIR, destRelative);

      fs.mkdirSync(path.dirname(destFile), { recursive: true });
      fs.copyFileSync(sourceFile, destFile);

      const { size } = fs.statSync(destFile);
      const mimeType = getMimeTypeFromExt(fileName);

      await prisma.galleryMedia.upsert({
        where: { categoryId_filePath: { categoryId: category.id, filePath: destRelative } },
        update: {
          type: getMediaTypeFromMime(mimeType),
          mimeType,
          size,
          group,
          sortOrder,
        },
        create: {
          categoryId: category.id,
          type: getMediaTypeFromMime(mimeType),
          filePath: destRelative,
          originalName: fileName,
          mimeType,
          size,
          group,
          sortOrder,
        },
      });

      sortOrder += 1;
    }

    console.log(`[seed] ${slug}: seeded ${sortOrder} media item(s)`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
