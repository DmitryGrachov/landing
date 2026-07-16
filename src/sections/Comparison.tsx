import { X } from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const theses = [
  "Разрозненные материалы не создают единого сценария выбора.",
  "Отдел продаж не видит цифровой след клиента.",
  "Покупатель вынужден повторять путь заново в офисе.",
];

export default function Comparison() {
  return (
    <section id="why" className="relative py-28 sm:py-36">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Проблема рынка"
          title="Почему стандартный сайт больше не решает задачу продаж"
          subtitle="Клиент смотрит материалы, уходит и возвращается уже без контекста. Офис продаж начинает диалог заново."
        />

        <Reveal delay={0.1} className="mt-8 max-w-[640px] text-center">
          <p className="text-[15px] leading-relaxed text-ink-dim">
            В классической схеме рендеры, сайт, презентация, туры и CRM существуют отдельно друг от друга. Клиенту приходится снова искать понравившиеся варианты, а менеджеру — заново выяснять интересы и потребности. В результате теряются лиды, время и темп сделки.
          </p>
        </Reveal>

        <div className="mt-12 flex w-full max-w-[720px] flex-col gap-4">
          {theses.map((t, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-ink-faint">
                  <X className="h-4 w-4" />
                </div>
                <span className="text-[14px] leading-snug text-ink-dim">{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
