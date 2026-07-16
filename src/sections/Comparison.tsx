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
    <section id="why" className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Проблема рынка"
          title="Почему стандартный сайт больше не решает задачу продаж"
          subtitle="Клиент смотрит материалы, уходит и возвращается уже без контекста. Офис продаж начинает диалог заново."
        />

        <Reveal delay={0.1} className="mt-8 max-w-[760px] text-center min-[1536px]:max-w-[880px]">
          <p className="text-[15px] leading-relaxed text-ink-dim min-[1536px]:text-[17px]">
            В классической схеме рендеры, сайт, презентация, туры и CRM существуют отдельно друг от друга. Клиенту приходится снова искать понравившиеся варианты, а менеджеру — заново выяснять интересы и потребности. В результате теряются лиды, время и темп сделки.
          </p>
        </Reveal>

        <div className="mt-12 flex w-full max-w-[720px] flex-col gap-4 min-[1536px]:max-w-[840px] min-[1536px]:gap-5">
          {theses.map((t, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 min-[1536px]:gap-4 min-[1536px]:p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-ink-faint min-[1536px]:h-10 min-[1536px]:w-10">
                  <X className="h-4 w-4 min-[1536px]:h-5 min-[1536px]:w-5" />
                </div>
                <span className="text-[14px] leading-snug text-ink-dim min-[1536px]:text-[16px]">{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
