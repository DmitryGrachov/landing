import {
  Boxes,
  Image,
  Clapperboard,
  Globe,
  Map,
  LayoutGrid,
  Gamepad2,
  QrCode,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const modules = [
  { icon: Image, label: "Визуализация" },
  { icon: Clapperboard, label: "Видео" },
  { icon: Globe, label: "Сайт проекта" },
  { icon: Map, label: "Интерактивный генплан" },
  { icon: LayoutGrid, label: "Выбор квартир и избранное" },
  { icon: Gamepad2, label: "UE5-демо" },
  { icon: QrCode, label: "QR и личный кабинет" },
  { icon: BarChart3, label: "CRM и скоринг" },
];

export default function Pipeline() {
  return (
    <section id="ecosystem" className="relative py-28 sm:py-36">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Единая цифровая сцена"
          title="Одна сцена — весь цикл продаж"
          subtitle="Из одного объекта создаём все цифровые инструменты: от визуализации до передачи интересов в CRM."
        />

        <Reveal delay={0.1} className="mt-6 max-w-[640px] text-center">
          <p className="text-[15px] leading-relaxed text-ink-dim">
            Мы не делаем набор разрозненных материалов. Мы строим единую цифровую сцену проекта, из которой рождаются рендеры, видео, сайт, интерактивный макет, UE5-демо и аналитика покупателя. Это позволяет использовать один контентный слой во всех каналах продаж.
          </p>
          <p className="mt-4 text-[14px] italic text-ink-faint">
            «Всё делается одной командой в едином стиле без поиска чужих рук»
          </p>
        </Reveal>

        <div className="mt-14 w-full">
          <Reveal>
            <div className="mx-auto flex w-fit flex-col items-center">
              <div className="glass-strong flex items-center gap-3 rounded-2xl px-6 py-4">
                <Boxes className="h-5 w-5 text-cyan" />
                <span className="text-[15px] font-medium text-white">Единая цифровая сцена</span>
              </div>
              <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </Reveal>

          <div className="relative">
            <div
              className="scrollbar-none -mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0"
            >
              {modules.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.05} className="shrink-0 snap-start">
                  <div className="panel group relative flex h-full w-[168px] flex-col gap-3 rounded-2xl p-5 transition-colors hover:bg-white/[0.07] sm:w-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo/25 to-cyan/15 text-white">
                        <m.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </div>
                      <span className="text-[11px] font-medium text-ink-faint">0{i + 1}</span>
                    </div>
                    <div className="text-[14px] font-medium leading-snug text-white">{m.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.3} className="mt-10 max-w-[640px] text-center">
          <div className="flex flex-col items-center gap-2 text-[13.5px] text-ink-faint sm:flex-row sm:justify-center">
            <span>Что получил отдел продаж</span>
            <ArrowRight className="hidden h-3.5 w-3.5 sm:block" />
            <span className="text-white">
              Какой эффект получил девелопер: ориентир полной экосистемы —
              −10–25% к сроку реализации, −20–40% к потерям лидов, +15–35% к качеству воронки.
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
