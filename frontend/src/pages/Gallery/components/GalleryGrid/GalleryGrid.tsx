import GalleryItem from "../GalleryItem/GalleryItem";
import type { LightboxMediaType } from "../../hooks/useLightbox";

export default function GalleryGrid({
  images,
  type = "image",
}: {
  images: string[];
  type?: LightboxMediaType;
}) {
  return (
    <div className="grid grid-cols-2 gap-0 min-[480px]:grid-cols-4">
      {images.map((src, i) => (
        <GalleryItem key={i} src={src} type={type} />
      ))}
    </div>
  );
}
