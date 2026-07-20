import type { MediaType } from "@prisma/client";
import { prisma } from "../../config/prisma";

export const galleryRepository = {
  findAllCategoriesWithMedia() {
    return prisma.galleryCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { media: { orderBy: { sortOrder: "asc" } } },
    });
  },

  findAllCategories() {
    return prisma.galleryCategory.findMany({ orderBy: { sortOrder: "asc" } });
  },

  findAllMedia() {
    return prisma.galleryMedia.findMany({
      include: { category: true },
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    });
  },

  findCategoryBySlug(slug: string) {
    return prisma.galleryCategory.findUnique({ where: { slug } });
  },

  countMediaInCategory(categoryId: string) {
    return prisma.galleryMedia.count({ where: { categoryId } });
  },

  createMedia(data: {
    categoryId: string;
    type: MediaType;
    filePath: string;
    originalName: string;
    mimeType: string;
    size: number;
    group: string | null;
    sortOrder: number;
  }) {
    return prisma.galleryMedia.create({ data, include: { category: true } });
  },

  findMediaById(id: string) {
    return prisma.galleryMedia.findUnique({ where: { id }, include: { category: true } });
  },

  deleteMediaById(id: string) {
    return prisma.galleryMedia.delete({ where: { id } });
  },
};
