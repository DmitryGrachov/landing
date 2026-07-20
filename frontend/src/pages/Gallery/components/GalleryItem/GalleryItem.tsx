import { useLightbox } from "../../hooks/useLightbox";

export default function GalleryItem({
  src,
  aspect = "aspect-square",
}: {
  src: string;
  aspect?: string;
}) {
  const { open } = useLightbox();

  return (
    <button
      type="button"
      onClick={() => open(src)}
      className={`group relative block w-full cursor-zoom-in overflow-hidden bg-black/5 ${aspect}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />
    </button>
  );
}
