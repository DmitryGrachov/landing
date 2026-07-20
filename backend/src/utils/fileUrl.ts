import path from "node:path";

/** Converts a filesystem-relative uploads path into the public URL Express serves it at. */
export function toPublicUploadUrl(relativePath: string): string {
  return `/uploads/${relativePath.split(path.sep).join("/")}`;
}
