import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Button from "../components/Button";

const tiers = [
  {
    name: "Частично",
    tagline: "Один модуль под конкретную задачу.",
    cta: "Обсудить запуск",
    featured: false,
  },
  {
    name: "Поэтапно",
    tagline: "Сначала сайт и визуализация, затем интерактивный макет, потом UE5 и CRM.",
    cta: "Обсудить запуск",
    featured: true,
  },
  {
    name: "Полностью",
    tagline: "Вся экосистема с единым контентом, единым сценарием и сквозной аналитикой.",
    cta: "Обсудить комплексный запуск",
    featured: false,
  },
];

export default function Implementation() {
  return (
    <section id="pricing" className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container className="flex flex-col items-center">
        <SectionHeading
          title="Три формата запуска"
          subtitle="Можно начать с одного блока, развить проект поэтапно или запустить всю экосистему сразу."
        />

        <Reveal delay={0.1} className="mt-6 max-w-[700px] text-center min-[1536px]:max-w-[820px]">
          <p className="text-[14.5px] leading-relaxed text-ink-faint min-[1536px]:text-[16.5px]">
            Такой подход снижает порог входа и даёт возможность выбрать темп внедрения в зависимости от готовности девелопера.
          </p>
        </Reveal>

        <div className="mt-12 grid w-full grid-cols-1 gap-5 min-[1024px]:grid-cols-3 min-[1536px]:gap-7">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-7 min-[1536px]:p-9 ${
                  t.featured ? "glass-strong ring-1 ring-white/20" : "panel"
                }`}
              >
                <div className="text-[18px] font-medium text-white min-[1536px]:text-[21px]">{t.name}</div>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-dim min-[1536px]:text-[16px]">{t.tagline}</p>

                <a href="#final-cta" className="mt-8">
                  <Button variant={t.featured ? "primary" : "secondary"} className="w-full">
                    {t.cta}
                  </Button>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
