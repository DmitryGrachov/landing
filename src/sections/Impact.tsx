import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const kpis = [
  { module: "Визуализация", value: "+10–20%", label: "к вовлечению", trend: "up", width: 55 },
  { module: "Веб-макет", value: "+15–30%", label: "к времени на сайте", trend: "up", width: 65 },
  { module: "UE5", value: "+10–25%", label: "к записи в офис", trend: "up", width: 60 },
  { module: "CRM и скоринг", value: "+10–25%", label: "к эффективности продаж", trend: "up", width: 60 },
  { module: "Полный контур", value: "до −10–25%", label: "к сроку реализации", trend: "down", width: 75 },
];

export default function Impact() {
  return (
    <section id="impact" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
      <Container className="relative flex flex-col items-center">
        <SectionHeading
          eyebrow="Эффект"
          title="Сколько денег и времени экономит экосистема"
          subtitle="Не только красиво, но и измеримо."
        />

        <Reveal delay={0.1} className="mt-6 max-w-[640px] text-center">
          <p className="text-[15px] leading-relaxed text-ink-dim">
            Для девелопера важно понимать, что даёт каждый модуль по отдельности и что меняется при полной интеграции. Поэтому мы считаем эффект в разрезе скорости продаж, глубины воронки, качества лида и нагрузки на менеджеров.
          </p>
        </Reveal>

        <div className="mt-14 grid w-full grid-cols-2 gap-4 lg:grid-cols-5">
          {kpis.map((k, i) => (
            <Reveal key={k.module} delay={i * 0.08}>
              <div className="panel flex h-full flex-col justify-between rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium uppercase tracking-wide text-ink-faint">{k.module}</span>
                  {k.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-cyan" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-cyan" />
                  )}
                </div>
                <span className="mt-4 text-[26px] font-semibold text-gradient sm:text-[30px]">{k.value}</span>
                <p className="mt-2 text-[13px] leading-snug text-ink-dim">{k.label}</p>
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
