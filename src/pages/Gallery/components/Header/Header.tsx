import { headerPhone } from "../../data";

export default function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="relative bg-white">
      <div className="relative flex h-[64px] items-center px-6 min-[480px]:h-[72px] min-[480px]:px-14">
        {/* Logo (left) */}
        <span className="text-[16px] font-bold tracking-tight text-black min-[480px]:text-[20px]">
          НЕТКОР
        </span>

        {/* Burger (centered) */}
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Открыть меню"
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[6px]"
        >
          <span className="block h-[2px] w-5 bg-black" />
          <span className="block h-[2px] w-5 bg-black" />
        </button>

        {/* Phone (right) */}
        <span className="ml-auto text-[11px] font-medium text-black min-[480px]:text-[13px]">
          {headerPhone}
        </span>
      </div>
    </header>
  );
}
