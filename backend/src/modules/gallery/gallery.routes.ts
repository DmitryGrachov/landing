import { Router } from "express";
import { upload } from "../../config/multer";
import { asyncHandler } from "../../utils/asyncHandler";
import { galleryController } from "./gallery.controller";

export const galleryRouter = Router();

// GET /api/gallery
galleryRouter.get("/", asyncHandler(galleryController.getGallery));

// POST /api/gallery/media (multipart/form-data: file, category, group?, sortOrder?)
galleryRouter.post("/media", upload.single("file"), asyncHandler(galleryController.uploadMedia));

// DELETE /api/gallery/media/:id
galleryRouter.delete("/media/:id", asyncHandler(galleryController.deleteMedia));
