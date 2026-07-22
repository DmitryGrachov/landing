import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const faqs = [
  {
    q: "Что такое Nexus?",
    a: "Цифровая экосистема продаж для жилых комплексов. Мы превращаем одну 3D-модель вашего проекта в визуализацию, видео, сайт проекта, интерактивный генплан, выбор квартир, UE5-демо, личный кабинет и CRM-аналитику — всё на основе одного источника.",
  },
  {
    q: "Нужно ли заменять текущую CRM?",
    a: "Нет. Nexus подключается к вашей текущей CRM и инструментам продаж, а не заменяет их. Активность покупателей, брони и аналитика поступают в те системы, которыми уже пользуется команда.",
  },
  {
    q: "Можно ли начать с одного модуля?",
    a: "Да. Большинство команд начинают с модуля, который решает самую острую задачу — чаще всего это визуализация или сайт проекта, — а затем расширяют систему без переделки уже сделанного.",
  },
  {
    q: "Кто создаёт цифровую сцену — мы или Nexus?",
    a: "Наша команда строит её на основе ваших архитектурных файлов. После этого каждый следующий модуль — видео, сайт, генплан, UE5 — создаётся на основе того же цифрового объекта.",
  },
  {
    q: "Сколько занимает внедрение?",
    a: "Один модуль обычно запускается за 3–6 недель. Полное развёртывание экосистемы занимает 2–4 месяца в зависимости от сложности проекта и количества этапов продаж.",
  },
  {
    q: "Подходит ли это для проекта, который уже продаётся?",
    a: "Да. Nexus часто подключают в середине цикла продаж, чтобы вернуть потерянные лиды и дать отделу продаж полную картину по проекту, который уже в продаже.",
  },
  {
    q: "Что нужно для UE5-демо?",
    a: "Оно работает в браузере и на стандартном оборудовании — без установки и выделенных рендер-машин. Покупатели и отдел продаж заходят по ссылке.",
  },
  {
    q: "Как данные синхронизируются между модулями?",
    a: "Каждый модуль считывает данные из единого источника проекта. Обновили наличие или цену один раз — сайт, генплан и CRM отражают это мгновенно.",
  },
  {
    q: "Насколько защищены данные покупателей?",
    a: "Личные кабинеты и данные CRM шифруются при передаче и хранении, доступ разграничен по ролям для отдела продаж и маркетинга.",
  },
  {
    q: "От чего зависит стоимость?",
    a: "Стоимость зависит от набора модулей и масштаба проекта — количества лотов, этапов продаж и темпа внедрения. План считаем после короткого созвона.",
  },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="panel rounded-2xl">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left min-[1536px]:px-8 min-[1536px]:py-6"
      >
        <span className="text-[15px] font-medium text-white min-[1536px]:text-[17px]">{q}</span>
        <Plus
          className={`h-4.5 w-4.5 shrink-0 text-ink-faint transition-transform duration-300 min-[1536px]:h-5 min-[1536px]:w-5 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[14px] leading-relaxed text-ink-faint min-[1536px]:px-8 min-[1536px]:pb-6 min-[1536px]:text-[16px]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container className="flex flex-col items-center">
        <SectionHeading title="Ответы на частые вопросы" />

        <div className="mt-14 flex w-full max-w-[760px] flex-col gap-3 min-[1536px]:max-w-[880px] min-[1536px]:gap-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 0.04, 0.3)}>
              <FAQItem q={f.q} a={f.a} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
