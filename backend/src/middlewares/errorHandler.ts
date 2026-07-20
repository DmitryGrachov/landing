import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { HttpError } from "../utils/HttpError";

// Express only recognizes this as an error-handling middleware because it declares 4 params.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
}
