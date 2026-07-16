import Container from "./Container";
import Logo from "./Logo";

const columns = [
  {
    title: "Продукт",
    links: ["Экосистема", "Визуализация", "UE5-демо", "CRM и скоринг", "Калькулятор эффекта"],
  },
  {
    title: "Решения",
    links: ["Девелоперам", "Отделу продаж", "Маркетингу", "Агентствам", "Банкам и партнёрам"],
  },
  {
    title: "Компания",
    links: ["О нас", "Кейсы", "Вакансии", "Контакты"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8 min-[1536px]:pt-24 min-[1536px]:pb-12">
      <Container>
        <div className="grid grid-cols-2 gap-10 pb-14 min-[768px]:grid-cols-5 min-[1536px]:gap-14 min-[1536px]:pb-20">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-[280px] text-[14px] leading-relaxed text-ink-faint min-[1536px]:mt-6 min-[1536px]:max-w-[320px] min-[1536px]:text-[15.5px]">
              Единая цифровая экосистема продаж новостроек.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-[13px] font-medium text-white min-[1536px]:text-[14.5px]">{col.title}</div>
              <ul className="mt-4 flex flex-col gap-3 min-[1536px]:mt-5 min-[1536px]:gap-4">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13.5px] text-ink-faint transition-colors hover:text-ink-dim min-[1536px]:text-[15px]">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-[13px] text-ink-faint min-[640px]:flex-row min-[1536px]:pt-10 min-[1536px]:text-[14px]">
          <span>© {new Date().getFullYear()} Nexus. Все права защищены.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink-dim">Конфиденциальность</a>
            <a href="#" className="hover:text-ink-dim">Условия</a>
            <a href="#" className="hover:text-ink-dim">Безопасность</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
