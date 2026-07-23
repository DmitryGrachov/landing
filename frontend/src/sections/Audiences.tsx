import { Building2, Users, Megaphone, Briefcase } from "lucide-react";
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
    desc: "Больше вовлечения, лучше поведенческие данные, понятная аналитика, сервис.",
  },
  {
    icon: Briefcase,
    title: "Для агентств",
    desc: "Удобный подбор квартир, история клиента, возврат в выбор.",
  },
];

export default function Audiences() {
  return (
    <section className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container className="flex flex-col items-center">
        <SectionHeading
          title="Кому полезен каждый модуль"
          subtitle="Разные участники процесса видят в системе свою ценность."
        />

        <div className="mt-16 grid w-full grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1536px]:gap-6">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="panel group h-full rounded-2xl p-6 transition-colors hover:bg-white/[0.07] min-[1536px]:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo/25 to-violet/15 min-[1536px]:h-14 min-[1536px]:w-14">
                  <a.icon className="h-5 w-5 text-white min-[1536px]:h-6 min-[1536px]:w-6" strokeWidth={1.75} />
                </div>
                <div className="mt-5 text-[16px] font-medium text-white min-[1536px]:mt-6 min-[1536px]:text-[19px]">{a.title}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-faint min-[1536px]:text-[16px]">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
