import path from "node:path";

const EXT_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".mkv": "video/x-matroska",
};

export function getMimeTypeFromExt(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  return EXT_TO_MIME[ext] ?? "application/octet-stream";
}

export function getMediaTypeFromMime(mimeType: string): "IMAGE" | "VIDEO" {
  return mimeType.startsWith("video/") ? "VIDEO" : "IMAGE";
}
