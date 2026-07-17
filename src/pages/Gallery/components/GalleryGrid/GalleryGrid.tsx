import GalleryItem from "../GalleryItem/GalleryItem";

export default function GalleryGrid({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-0 min-[480px]:grid-cols-4">
      {images.map((src, i) => (
        <GalleryItem key={i} src={src} />
      ))}
    </div>
  );
}
