export type MediaType = "IMAGE" | "VIDEO";

export interface Category {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
}

export interface Media {
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
  createdAt: string;
}
