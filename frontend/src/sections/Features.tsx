import { useRef } from "react";
import { ChevronLeft, ChevronRight, Building2, Sofa, DoorOpen, Trees, Sun, LayoutGrid } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";

type Feature = {
  title: string;
  description: string;
  image?: string;
  icon: typeof Building2;
  gradient: string;
};

const features: Feature[] = [
  {
    title: "Обзор ЖК",
    description: "Обзор жилого комплекса и его окружения",
    icon: Building2,
    gradient: "from-indigo/30 via-indigo/10 to-transparent",
  },
  {
    title: "Исследование интерьера",
    description: "Прогулка по будущей квартире покупателя от 1-го лица",
    icon: Sofa,
    gradient: "from-violet/30 via-violet/10 to-transparent",
  },
  {
    title: "Обзор зон благоустройства",
    description: "Отображение мест общего пользования: зелёные зоны, детские и спортивные площадки",
    icon: Trees,
    gradient: "from-cyan/30 via-cyan/10 to-transparent",
  },
  {
    title: "Реальный вид из окна",
    description: "Демонстрация реального вида из окна будущей квартиры покупателя",
    icon: DoorOpen,
    gradient: "from-amber/30 via-amber/10 to-transparent",
  },
  {
    title: "Смена времени суток",
    description: "Переключение освещения дня и ночи для оценки атмосферы проекта",
    icon: Sun,
    gradient: "from-indigo/25 via-cyan/15 to-transparent",
  },
  {
    title: "Расстановка мебели",
    description: "Визуализация вариантов меблировки и планировочных решений",
    icon: LayoutGrid,
    gradient: "from-violet/25 via-amber/15 to-transparent",
  },
];

export default function Features() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 300) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[30px] font-semibold leading-[1.15] text-white min-[640px]:text-[38px] min-[1536px]:text-[46px]">
            Что входит в проект?
          </h2>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[13px] font-medium text-ink-dim min-[1536px]:px-5 min-[1536px]:py-2 min-[1536px]:text-[14.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo to-cyan" />
            Функционал
          </span>
        </Reveal>

        <div className="relative mt-10 min-[1536px]:mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-canvas to-transparent min-[1536px]:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-canvas to-transparent min-[1536px]:w-16" />

          <div
            ref={trackRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 min-[1536px]:gap-6"
          >
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05} className="shrink-0 snap-start">
                <div
                  data-card
                  className="panel group flex w-[260px] flex-col overflow-hidden rounded-2xl transition-colors hover:bg-white/[0.07] min-[1536px]:w-[300px]"
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
                  <div className={`relative mx-3 mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${f.gradient} min-[1536px]:mx-4 min-[1536px]:mb-4`}>
                    {f.image ? (
                      <img src={f.image} alt={f.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <button
            type="button"
            aria-label="Прокрутить влево"
            onClick={() => scroll(-1)}
            className="glass absolute left-1 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-105 min-[900px]:flex min-[1536px]:h-12 min-[1536px]:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Прокрутить вправо"
            onClick={() => scroll(1)}
            className="glass absolute right-1 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-105 min-[900px]:flex min-[1536px]:h-12 min-[1536px]:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
