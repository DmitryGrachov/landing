import type { TabDef, TabId } from "../../types";

// Fixed, pill-shaped floating nav that stays on screen while scrolling —
// confirmed on the source page: same viewport position at every scroll offset.
export default function FloatingTabBar({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: TabDef[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[59px] z-30 hidden justify-center min-[480px]:flex">
      <nav className="pointer-events-auto flex items-center gap-9 rounded-[25px] bg-white px-10 py-[22px]">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTabChange(t.id)}
            className="text-[12px] font-semibold transition-colors"
            style={{ color: t.id === activeTab ? "rgb(26,26,26)" : "rgb(206,206,206)" }}
          >
            {t.shortLabel}
          </button>
        ))}
      </nav>
    </div>
  );
}
