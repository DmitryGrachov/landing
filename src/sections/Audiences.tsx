import { Building2, Users, Megaphone, Briefcase, Landmark } from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const audiences = [
  {
    icon: Building2,
    title: "Для девелопера",
    desc: "Ускорение продаж, снижение потерь, управляемая воронка.",
  },
  {
    icon: Users,
    title: "Для отдела продаж",
    desc: "Готовый профиль клиента, приоритет горячих лидов, меньше ручной работы.",
  },
  {
    icon: Megaphone,
    title: "Для маркетинга",
    desc: "Больше вовлечения, лучше поведенческие данные, понятная аналитика.",
  },
  {
    icon: Briefcase,
    title: "Для агентств",
    desc: "Удобный подбор квартир, история клиента, возврат в выбор.",
  },
  {
    icon: Landmark,
    title: "Для банка или партнёра",
    desc: "Прозрачность процесса и ускорение наполнения сделки.",
  },
];

export default function Audiences() {
  return (
    <section className="relative py-28 sm:py-36">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Для кого это"
          title="Кому полезен каждый модуль"
          subtitle="Разные участники процесса видят в системе свою ценность."
        />

        <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="panel group h-full rounded-2xl p-6 transition-colors hover:bg-white/[0.07]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo/25 to-violet/15">
                  <a.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                </div>
                <div className="mt-5 text-[16px] font-medium text-white">{a.title}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-faint">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
