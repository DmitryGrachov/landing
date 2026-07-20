import { X, Send, Phone } from "lucide-react";
import type { MenuLink, SocialLink, TabId } from "../../types";

function scrollToAnchor(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Menu({
  open,
  onClose,
  onTabChange,
  logo,
  links,
  socials,
  phone,
}: {
  open: boolean;
  onClose: () => void;
  onTabChange: (id: TabId) => void;
  logo: string;
  links: MenuLink[];
  socials: SocialLink[];
  phone: string;
}) {
  function navigateTo(href: string, tab?: TabId) {
    if (tab) {
      onTabChange(tab);
      // wait for the tab content to render before scrolling to it
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToAnchor(href)));
    } else {
      scrollToAnchor(href);
    }
    onClose();
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed inset-y-0 right-0 z-[95] flex w-full flex-col bg-[#191919] px-6 py-7 transition-transform duration-300 ease-out sm:max-w-[420px] sm:px-10 sm:py-9 md:max-w-[520px] lg:max-w-[648px] ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo("#home")}
            className="text-[20px] font-bold tracking-tight text-[#fdfdfd] sm:text-[28px]"
          >
            {logo}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-16 flex flex-col gap-5 sm:mt-20 sm:gap-6">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <a
                key={l.href}
                href={l.href}
                className="text-left text-[32px] font-semibold leading-tight text-[#8a8a8a] transition-colors hover:text-white sm:text-[42px] md:text-[50px]"
              >
                {l.label}
              </a>
            ) : (
              <button
                key={l.href}
                type="button"
                onClick={() => navigateTo(l.href, l.tab)}
                className="text-left text-[32px] font-semibold leading-tight text-[#8a8a8a] transition-colors hover:text-white sm:text-[42px] md:text-[50px]"
              >
                {l.label}
              </button>
            ),
          )}
        </nav>

        <div className="mt-auto flex flex-col gap-6 pt-16">
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9d5cb] text-[13px] font-semibold text-[#1a1a1a] transition-transform hover:scale-105"
              >
                {s.label === "telegram" ? <Send className="h-4 w-4" /> : s.icon}
              </a>
            ))}
            <a
              href={`tel:${phone.replace(/-/g, "")}`}
              aria-label="Телефон"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9d5cb] text-[#1a1a1a] transition-transform hover:scale-105"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-col gap-1 text-[15px] text-[#8a8a8a] sm:text-[16px]">
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </>
  );
}
