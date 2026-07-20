import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import { galleryRouter } from "./modules/gallery/gallery.routes";

export const app = express();

app.use(cors({ origin: env.corsOrigins }));
app.use(express.json());

// Serves uploaded media as-is; POST/DELETE below manage what lives here.
app.use("/uploads", express.static(env.uploadsDir));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/gallery", galleryRouter);

app.use(notFoundHandler);
app.use(errorHandler);
