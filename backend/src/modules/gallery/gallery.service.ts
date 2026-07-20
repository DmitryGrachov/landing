import fs from "node:fs";
import path from "node:path";
import { env } from "../../config/env";
import { HttpError } from "../../utils/HttpError";
import { toPublicUploadUrl } from "../../utils/fileUrl";
import { getMediaTypeFromMime } from "../../utils/mime";
import { galleryRepository } from "./gallery.repository";
import type { CategoryDto, CreateMediaInput, GalleryResponse, MediaDto } from "./gallery.types";

function toMediaDto(media: {
  id: string;
  category: { slug: string };
  type: MediaDto["type"];
  filePath: string;
  originalName: string | null;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  group: string | null;
  sortOrder: number;
  createdAt: Date;
}): MediaDto {
  return {
    id: media.id,
    category: media.category.slug,
    type: media.type,
    url: toPublicUploadUrl(media.filePath),
    originalName: media.originalName,
    mimeType: media.mimeType,
    size: media.size,
    width: media.width,
    height: media.height,
    group: media.group,
    sortOrder: media.sortOrder,
    createdAt: media.createdAt,
  };
}

async function getGallery(): Promise<GalleryResponse> {
  const categories = await galleryRepository.findAllCategoriesWithMedia();

  const response: GalleryResponse = {};
  for (const category of categories) {
    response[category.slug] = category.media.map((m) => toPublicUploadUrl(m.filePath));
  }
  return response;
}

async function listCategories(): Promise<CategoryDto[]> {
  const categories = await galleryRepository.findAllCategories();
  return categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    mediaType: c.mediaType,
    sortOrder: c.sortOrder,
  }));
}

async function listMedia(): Promise<MediaDto[]> {
  const media = await galleryRepository.findAllMedia();
  return media.map(toMediaDto);
}

async function createMedia(input: CreateMediaInput): Promise<MediaDto> {
  const category = await galleryRepository.findCategoryBySlug(input.categorySlug);

  if (!category) {
    fs.unlinkSync(input.tempFilePath);
    throw new HttpError(400, `Unknown gallery category: "${input.categorySlug}"`);
  }

  if (!input.mimeType.startsWith("image/") && !input.mimeType.startsWith("video/")) {
    fs.unlinkSync(input.tempFilePath);
    throw new HttpError(400, `Unsupported file type: "${input.mimeType}"`);
  }

  const uploadedType = getMediaTypeFromMime(input.mimeType);
  if (uploadedType !== category.mediaType) {
    fs.unlinkSync(input.tempFilePath);
    throw new HttpError(
      400,
      `Category "${category.slug}" only accepts ${category.mediaType === "VIDEO" ? "video" : "image"} files`,
    );
  }

  const destFileName = path.basename(input.tempFilePath);
  const destRelativePath = path.posix.join(category.slug, destFileName);
  const destAbsolutePath = path.join(env.uploadsDir, category.slug, destFileName);

  fs.mkdirSync(path.dirname(destAbsolutePath), { recursive: true });
  fs.renameSync(input.tempFilePath, destAbsolutePath);

  const sortOrder = input.sortOrder ?? (await galleryRepository.countMediaInCategory(category.id));

  const media = await galleryRepository.createMedia({
    categoryId: category.id,
    type: uploadedType,
    filePath: destRelativePath,
    originalName: input.originalName,
    mimeType: input.mimeType,
    size: input.size,
    group: input.group ?? null,
    sortOrder,
  });

  return toMediaDto(media);
}

async function deleteMedia(id: string): Promise<void> {
  const media = await galleryRepository.findMediaById(id);
  if (!media) {
    throw new HttpError(404, `Gallery media not found: "${id}"`);
  }

  await galleryRepository.deleteMediaById(id);

  const absolutePath = path.join(env.uploadsDir, media.filePath);
  fs.rm(absolutePath, { force: true }, (err) => {
    if (err) console.error(`Failed to remove file ${absolutePath}:`, err);
  });
}

export const galleryService = { getGallery, listCategories, listMedia, createMedia, deleteMedia };
