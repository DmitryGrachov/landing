import type { MediaType } from "@prisma/client";

/** Response shape of GET /api/gallery: mirrors the old gallery-data.json "gallery" object. */
export type GalleryResponse = Record<string, string[]>;

export type MediaDto = {
  id: string;
  category: string;
  type: MediaType;
  url: string;
  originalName: string | null;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  group: string | null;
  sortOrder: number;
  createdAt: Date;
};

export type CategoryDto = {
  id: string;
  slug: string;
  name: string;
  mediaType: MediaType;
  sortOrder: number;
};

export type CreateMediaInput = {
  categorySlug: string;
  tempFilePath: string;
  originalName: string;
  mimeType: string;
  size: number;
  group?: string | null;
  sortOrder?: number;
};
