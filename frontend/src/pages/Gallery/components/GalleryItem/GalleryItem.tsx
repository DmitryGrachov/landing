import { useLightbox } from "../../hooks/useLightbox";
import type { LightboxMediaType } from "../../hooks/useLightbox";

export default function GalleryItem({
  src,
  aspect = "aspect-square",
  type = "image",
}: {
  src: string;
  aspect?: string;
  type?: LightboxMediaType;
}) {
  const { open } = useLightbox();

  return (
    <button
      type="button"
      onClick={() => open(src, type)}
      className={`group relative block w-full cursor-zoom-in overflow-hidden bg-black/5 ${aspect}`}
    >
      {type === "video" ? (
        <video
          src={src}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      )}
    </button>
  );
}
