import GalleryItem from "../GalleryItem/GalleryItem";
import { showcaseImages } from "../../data";

export default function Showcase() {
  return (
    <section id="showcase" className="scroll-mt-[90px] bg-white px-6 py-6 min-[480px]:px-10">
      <div className="mx-auto flex max-w-[1345px] flex-col gap-0">
        {showcaseImages.map((src, i) => (
          <GalleryItem key={i} src={src} aspect="aspect-[4/3]" />
        ))}
      </div>
    </section>
  );
}
