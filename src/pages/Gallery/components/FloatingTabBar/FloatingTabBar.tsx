const tabs = [
  { label: "Архивиз", href: "#works" },
  { label: "Видео", href: "#video" },
  { label: "ПО/UE", href: "#software" },
];

// Fixed, pill-shaped floating nav that stays on screen while scrolling —
// confirmed on the source page: same viewport position at every scroll offset.
export default function FloatingTabBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[59px] z-30 hidden justify-center min-[480px]:flex">
      <nav className="pointer-events-auto flex items-center gap-9 rounded-[25px] bg-white px-10 py-[22px]">
        {tabs.map((t, i) => (
          <a
            key={t.href}
            href={t.href}
            className="text-[12px] font-semibold transition-colors"
            style={{ color: i === 0 ? "rgb(26,26,26)" : "rgb(206,206,206)" }}
          >
            {t.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
