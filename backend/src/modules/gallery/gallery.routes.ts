import { Router } from "express";
import { upload } from "../../config/multer";
import { asyncHandler } from "../../utils/asyncHandler";
import { galleryController } from "./gallery.controller";

export const galleryRouter = Router();

// GET /api/gallery
galleryRouter.get("/", asyncHandler(galleryController.getGallery));

// GET /api/gallery/categories (admin: valid category slugs to upload into)
galleryRouter.get("/categories", asyncHandler(galleryController.listCategories));

// GET /api/gallery/media (admin: full media list with ids/metadata)
galleryRouter.get("/media", asyncHandler(galleryController.listMedia));

// POST /api/gallery/media (multipart/form-data: file, category, group?, sortOrder?)
galleryRouter.post("/media", upload.single("file"), asyncHandler(galleryController.uploadMedia));

// DELETE /api/gallery/media/:id
galleryRouter.delete("/media/:id", asyncHandler(galleryController.deleteMedia));
