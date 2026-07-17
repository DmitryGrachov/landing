import { tabs, type TabId } from "../../data";

export default function Hero({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}) {
  return (
    <section id="home" className="scroll-mt-[90px] bg-white px-6 pb-10 pt-14 min-[480px]:px-14 min-[480px]:pb-14 min-[480px]:pt-[150px]">
      <p className="text-[10px] font-semibold text-black min-[480px]:text-[18px]">Портфолио</p>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 min-[480px]:mt-12 min-[480px]:gap-x-16">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTabChange(t.id)}
            className="text-[20px] font-bold leading-[1.55] tracking-[-1px] transition-opacity hover:opacity-70 min-[480px]:text-[36px]"
            style={{ color: t.id === activeTab ? "rgb(17,17,17)" : "rgb(220,220,220)" }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}
