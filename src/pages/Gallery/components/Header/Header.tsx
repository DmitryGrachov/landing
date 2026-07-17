import { Menu } from "lucide-react";
import { headerPhone } from "../../data";

export default function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="relative bg-white">
      {/*
        The source page (weweffwefewf.tilda.ws/test1) has the logo and phone
        number genuinely overlapping at >=480px width, and both are pinned via
        position:fixed so they stay on screen while scrolling — confirmed via
        computed styles (both ~40px font, near-identical fixed x/y, unchanged
        across scroll positions). This looks like an authoring bug in the
        source (a "test1" draft page), but it is replicated faithfully here
        per the pixel-perfect requirement. Below 480px the source renders a
        normal (non-fixed, non-overlapping) row instead.
      */}
      {/* Mobile (<480px): clean static single row */}
      <div className="flex h-[90px] items-center justify-between px-6 min-[480px]:hidden">
        <span className="text-[14px] font-bold tracking-tight text-black">НЕТКОР</span>
        <button type="button" onClick={onMenuOpen} aria-label="Открыть меню">
          <Menu className="h-5 w-5 text-black" />
        </button>
        <span className="text-[8px] font-medium text-black">{headerPhone}</span>
      </div>

      {/* Tablet/desktop (>=480px): fixed-position, replicated overlap */}
      <div aria-hidden className="hidden h-[310px] min-[480px]:block" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden min-[480px]:block">
        <span className="absolute left-[95px] top-[244px] text-[40px] font-bold tracking-tight text-black">
          НЕТКОР
        </span>
        <span className="absolute left-[108px] top-[255px] text-[40px] font-medium text-black">
          {headerPhone}
        </span>
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Открыть меню"
          className="pointer-events-auto absolute right-6 top-6 flex h-10 w-10 items-center justify-center sm:right-10"
        >
          <Menu className="h-6 w-6 text-black" />
        </button>
      </div>
    </header>
  );
}
