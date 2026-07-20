/**
 * One-off migration: reads the legacy frontend/public/gallery-data.json,
 * copies the referenced files into backend/uploads/<category>/..., and
 * inserts one GalleryMedia row per file. Safe to re-run (upserts).
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
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

const CATEGORY_DEFS: Record<keyof LegacyGalleryData["gallery"], { name: string; sortOrder: number }> = {
  feature: { name: "Возможности", sortOrder: 0 },
  works: { name: "Работы", sortOrder: 1 },
  showcase: { name: "Витрина партнёров", sortOrder: 2 },
};

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

  for (const slug of Object.keys(CATEGORY_DEFS) as (keyof LegacyGalleryData["gallery"])[]) {
    const def = CATEGORY_DEFS[slug];
    const category = await prisma.galleryCategory.upsert({
      where: { slug },
      update: { name: def.name, sortOrder: def.sortOrder },
      create: { slug, name: def.name, sortOrder: def.sortOrder },
    });

    const legacyPaths = legacyData.gallery[slug] ?? [];
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
