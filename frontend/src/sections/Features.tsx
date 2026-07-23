import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PulseCtaButton from "../components/PulseCtaButton";
import type { FeatureCard } from "../content/systemModules";

const VIDEO_EXTENSIONS = [".webm", ".mp4", ".mov", ".ogg"];
const isVideoMedia = (url: string) => VIDEO_EXTENSIONS.some((ext) => url.toLowerCase().endsWith(ext));

export default function Features({
  heading,
  features,
  buttonLabel,
  showDemoButton,
  previewVideoUrl,
  modalVideoUrl,
  streamUrl,
  downloadLabel,
  downloadHref,
}: {
  heading: string;
  features: FeatureCard[];
  buttonLabel?: string;
  showDemoButton?: boolean;
  previewVideoUrl?: string;
  modalVideoUrl?: string;
  streamUrl?: string;
  downloadLabel?: string;
  downloadHref?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 820);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    setIsMobile(window.innerWidth < 820);

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards.length) return;
    const trackRect = el.getBoundingClientRect();
    const trackCenterX = trackRect.left + trackRect.width / 2;
    let closestIndex = 0;
    let closestDist = Infinity;
    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(cardCenterX - trackCenterX);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = idx;
      }
    });
    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(updateScrollState);
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 300) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative pb-28 pt-10 min-[640px]:pb-36 min-[640px]:pt-14 min-[1536px]:pb-44 min-[1536px]:pt-16 min-[1920px]:pb-52 min-[1920px]:pt-20">
      <Container>
        <Reveal>
          <h2 className="text-[30px] font-semibold leading-[1.15] text-white min-[640px]:text-[38px] min-[1536px]:text-[46px]">
            {heading}
          </h2>
        </Reveal>

        <div className="relative mt-10 min-[1536px]:mt-14">
          {canScrollLeft && (
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-14 bg-gradient-to-r from-canvas via-canvas/70 to-transparent min-[820px]:block min-[1536px]:w-20" />
          )}
          {canScrollRight && (
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-14 bg-gradient-to-l from-canvas via-canvas/70 to-transparent min-[820px]:block min-[1536px]:w-20" />
          )}

          <div
            ref={trackRef}
            style={{ overflowAnchor: "none" }}
            className="scrollbar-none flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-[11%] pb-2 min-[820px]:px-0 min-[820px]:pb-16 min-[820px]:pt-3 min-[1536px]:gap-6"
          >
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 0.05}
                className="shrink-0 snap-center transition-[width] duration-300 ease-out min-[820px]:w-auto min-[820px]:snap-start"
                style={isMobile ? { width: activeIndex === i ? "86%" : "68%" } : undefined}
              >
                <div
                  data-card
                  className={`panel group flex w-full origin-top flex-col overflow-hidden rounded-2xl transition-[opacity,background-color,transform] duration-300 ease-out hover:bg-white/[0.07] min-[820px]:w-[260px] min-[820px]:opacity-100 min-[820px]:hover:scale-[1.14] min-[1536px]:w-[300px] ${
                    isMobile && activeIndex !== i ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col gap-3 p-5 pb-4 min-[1536px]:gap-3.5 min-[1536px]:p-6 min-[1536px]:pb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo/25 to-cyan/15 text-white min-[1536px]:h-10 min-[1536px]:w-10">
                      <f.icon className="h-[18px] w-[18px] min-[1536px]:h-5 min-[1536px]:w-5" strokeWidth={1.75} />
                    </div>
                    <div className="text-[15px] font-medium leading-snug text-white min-[1536px]:text-[17px]">
                      {f.title}
                    </div>
                    <p className="text-[13px] leading-relaxed text-ink-dim min-[1536px]:text-[14.5px]">
                      {f.description}
                    </p>
                  </div>
                  <div className="relative mx-3 mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-surface min-[1536px]:mx-4 min-[1536px]:mb-4">
                    {f.media ? (
                      isVideoMedia(f.media) ? (
                        <video
                          src={f.media}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img src={f.media} alt={f.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )
                    ) : (
                      <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {canScrollLeft && (
            <button
              type="button"
              aria-label="Прокрутить влево"
              onClick={() => scroll(-1)}
              className="glass absolute left-1 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-105 min-[900px]:flex min-[1536px]:h-12 min-[1536px]:w-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              aria-label="Прокрутить вправо"
              onClick={() => scroll(1)}
              className="glass absolute right-1 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-105 min-[900px]:flex min-[1536px]:h-12 min-[1536px]:w-12"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-10 flex justify-center min-[1536px]:mt-14">
          <PulseCtaButton
            buttonLabel={buttonLabel}
            showDemoButton={showDemoButton}
            previewVideoUrl={previewVideoUrl}
            modalVideoUrl={modalVideoUrl}
            streamUrl={streamUrl}
            downloadLabel={downloadLabel}
            downloadHref={downloadHref}
          />
        </div>
      </Container>
    </section>
  );
}
