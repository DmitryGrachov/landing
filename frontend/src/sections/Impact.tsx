import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const kpis = [
  { module: "Визуализация", value: "+10–20%", label: "к вовлечению", trend: "up", width: 55 },
  { module: "Веб-макет", value: "+15–30%", label: "к времени на сайте", trend: "up", width: 65 },
  { module: "UE5-макет", value: "+10–25%", label: "к записи в офис", trend: "up", width: 60 },
  { module: "CRM и скоринг", value: "+10–25%", label: "к эффективности продаж", trend: "up", width: 60 },
  { module: "Полный контур", value: "до −10–25%", label: "к сроку реализации ЖК", trend: "down", width: 75 },
];

export default function Impact() {
  return (
    <section id="impact" className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
      <Container className="relative flex flex-col items-center">
        <SectionHeading
          title="Сколько денег и времени экономит экосистема"
          subtitle="Не только красиво, но и измеримо."
        />

        <Reveal delay={0.1} className="mt-6 max-w-[760px] text-center min-[1536px]:max-w-[880px]">
          <p className="text-[15px] leading-relaxed text-ink-dim min-[1536px]:text-[17px]">
            Для девелопера важно понимать, что даёт каждый модуль по отдельности и что меняется при полной интеграции. Поэтому мы считаем эффект в разрезе скорости продаж, глубины воронки, качества лида и нагрузки на менеджеров.
          </p>
        </Reveal>

        <div className="mt-14 grid w-full grid-cols-2 gap-4 min-[1024px]:grid-cols-5 min-[1536px]:gap-5">
          {kpis.map((k, i) => (
            <Reveal key={k.module} delay={i * 0.08}>
              <div className="panel flex h-full flex-col justify-between rounded-2xl p-6 min-[1536px]:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium uppercase tracking-wide text-ink-faint min-[1536px]:text-[13px]">{k.module}</span>
                  {k.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-cyan" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-cyan" />
                  )}
                </div>
                <span className="mt-4 text-[26px] font-semibold text-gradient min-[640px]:text-[30px] min-[1536px]:text-[38px]">{k.value}</span>
                <p className="mt-2 text-[13px] leading-snug text-ink-dim min-[1536px]:text-[15px]">{k.label}</p>
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo to-cyan"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${k.width}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
