import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { env } from "./env";

const TEMP_DIR = path.join(env.uploadsDir, "tmp");
fs.mkdirSync(TEMP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, TEMP_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

// Files land in uploads/tmp first; the service moves the validated file into
// its final uploads/<category>/ location and only then writes the DB row.
export const upload = multer({
  storage,
  limits: { fileSize: env.maxUploadBytes },
});
