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
  { icon: Gamepad2, label: "Интерактивный UE5 макет" },
  { icon: Globe, label: "Интерактивный WEB макет" },
  { icon: LayoutGrid, label: "Выбор квартир и избранное" },
  { icon: QrCode, label: "QR и личный кабинет" },
  { icon: BarChart3, label: "CRM и скоринг" },
];

export default function Pipeline() {
  return (
    <section id="ecosystem" className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container className="flex flex-col items-center">
        <SectionHeading
          title="Одна сцена — Скорость выхода на продажи"
          subtitle="Из одного объекта создаём все цифровые инструменты: от визуализации до передачи интересов в CRM."
        />

        <Reveal delay={0.1} className="mt-6 max-w-[760px] text-center min-[1536px]:max-w-[880px]">
          <p className="text-[15px] leading-relaxed text-ink-dim min-[1536px]:text-[17px]">
            Мы не делаем набор разрозненных материалов. Мы строим единую цифровую сцену проекта, из которой рождаются рендеры, видео, интерактивный макет UE5, WEB макет и аналитика покупателя. Это позволяет использовать один контентный слой во всех каналах продаж.
          </p>
          <p className="mt-4 text-[14px] italic text-ink-faint min-[1536px]:text-[16px]">
            «Всё делается одной командой в едином стиле без поиска чужих рук»
          </p>
          <p className="mt-5 text-[16px] font-semibold text-white min-[1536px]:text-[18.5px]">
            Единая цифровая сцена позволяет выдавать весь контент параллельно за 30-60-90 и 120 дней
          </p>
        </Reveal>

        <div className="mt-14 w-full min-[1536px]:mt-20">
          <Reveal>
            <div className="mx-auto flex w-fit flex-col items-center">
              <div className="glass-strong flex items-center gap-3 rounded-2xl px-6 py-4 min-[1536px]:px-8 min-[1536px]:py-5">
                <Boxes className="h-5 w-5 text-cyan" />
                <span className="text-[15px] font-medium text-white min-[1536px]:text-[17px]">Единая цифровая сцена</span>
              </div>
              <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </Reveal>

          <div className="relative">
            <div
              className="scrollbar-none -mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-4 min-[640px]:mx-0 min-[640px]:grid min-[640px]:grid-cols-4 min-[640px]:gap-4 min-[640px]:overflow-visible min-[640px]:px-0 min-[640px]:pb-0 min-[1536px]:gap-6"
            >
              {modules.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.05} className="shrink-0 snap-start">
                  <div className="panel group relative flex h-full w-[168px] flex-col gap-3 rounded-2xl p-5 transition-colors hover:bg-white/[0.07] min-[640px]:w-auto min-[1536px]:gap-4 min-[1536px]:p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo/25 to-cyan/15 text-white min-[1536px]:h-12 min-[1536px]:w-12">
                        <m.icon className="h-[18px] w-[18px] min-[1536px]:h-5 min-[1536px]:w-5" strokeWidth={1.75} />
                      </div>
                      <span className="text-[11px] font-medium text-ink-faint min-[1536px]:text-[12.5px]">0{i + 1}</span>
                    </div>
                    <div className="text-[14px] font-medium leading-snug text-white min-[1536px]:text-[16px]">{m.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.3} className="mt-10 max-w-[760px] text-center min-[1536px]:max-w-[880px]">
          <div className="flex flex-col items-center gap-2 text-[13.5px] text-ink-faint min-[640px]:flex-row min-[640px]:justify-center min-[1536px]:text-[15px]">
            <span>Что получил отдел продаж</span>
            <ArrowRight className="hidden h-3.5 w-3.5 min-[640px]:block" />
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
