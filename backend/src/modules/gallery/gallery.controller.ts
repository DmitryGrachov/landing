import fs from "node:fs";
import type { Request, Response } from "express";
import { HttpError } from "../../utils/HttpError";
import { galleryService } from "./gallery.service";

async function getGallery(_req: Request, res: Response) {
  const data = await galleryService.getGallery();
  res.json(data);
}

async function uploadMedia(req: Request, res: Response) {
  const file = req.file;
  const { category, group, sortOrder } = req.body as Record<string, string | undefined>;

  if (!file) {
    throw new HttpError(400, 'Missing file: send it as a "file" multipart field');
  }

  if (!category) {
    fs.unlinkSync(file.path);
    throw new HttpError(400, 'Missing required field: "category"');
  }

  let parsedSortOrder: number | undefined;
  if (sortOrder !== undefined && sortOrder !== "") {
    parsedSortOrder = Number(sortOrder);
    if (!Number.isInteger(parsedSortOrder)) {
      fs.unlinkSync(file.path);
      throw new HttpError(400, '"sortOrder" must be an integer');
    }
  }

  const media = await galleryService.createMedia({
    categorySlug: category,
    tempFilePath: file.path,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    group: group || null,
    sortOrder: parsedSortOrder,
  });

  res.status(201).json(media);
}

async function deleteMedia(req: Request, res: Response) {
  const { id } = req.params;
  await galleryService.deleteMedia(id);
  res.status(204).send();
}

export const galleryController = { getGallery, uploadMedia, deleteMedia };
