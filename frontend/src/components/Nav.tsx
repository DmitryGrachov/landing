import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { useContactModal } from "./ContactModal";

const CONTACT_PHONE = "+7 (919) 076-43-06";

const links = [
  { label: "Интерактивный макет UE5", href: "#1" },
  { label: "WEB макет", href: "#2" },
  { label: "Экосистема", href: "#3" },
  { label: "Единая сцена", href: "#ecosystem" },
  { label: "Запуск", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: -16, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: scrolled ? "auto" : "none" }}
      >
        <Container
          className="pt-4 transition-[padding] duration-300 min-[1536px]:pt-6"
          style={menuOpen ? { paddingLeft: 0, paddingRight: 0, paddingTop: 0 } : undefined}
        >
          <div
            style={!menuOpen && scrolled ? { backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" } : undefined}
            className={`flex items-center justify-between px-4 py-3 transition-all duration-300 min-[1536px]:px-6 min-[1536px]:py-4 ${
              menuOpen
                ? "rounded-none bg-gradient-to-b from-[#14161f] to-[#0a0c13]"
                : scrolled
                  ? "rounded-2xl glass-strong shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
                  : "rounded-2xl border border-transparent"
            }`}
          >
            <a href="#top" className="shrink-0" onClick={closeMenu}>
              <Logo />
            </a>
            <nav className="hidden items-center gap-0.5 min-[1280px]:flex min-[1536px]:gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-white min-[1536px]:px-4 min-[1536px]:text-[14.5px]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <a href="#roi" className="hidden min-[640px]:block">
                <Button variant="secondary" size="md" className="whitespace-nowrap">
                  Посчитать эффект
                </Button>
              </a>
              <div className="hidden min-[1280px]:block">
                <Button
                  variant="primary"
                  size="md"
                  className="whitespace-nowrap"
                  onClick={() => openContactModal("Запросить демо")}
                >
                  Запросить демо
                </Button>
              </div>
              <button
                type="button"
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.06] min-[1280px]:hidden"
              >
                <span className="relative flex h-4 w-5 flex-col justify-between">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[1.5px] w-full origin-center rounded-full bg-white"
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="h-[1.5px] w-full rounded-full bg-white"
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[1.5px] w-full origin-center rounded-full bg-white"
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-[calc(100dvh-80px)] w-full flex-col overflow-y-auto rounded-b-[28px] border-b border-white/[0.12] bg-gradient-to-b from-[#14161f] to-[#0a0c13] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] min-[1280px]:hidden"
            >
              <nav className="flex flex-col gap-0 px-6 pt-[clamp(4px,1.6dvh,16px)]">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={closeMenu}
                    className="rounded-xl px-2 py-[clamp(4px,1.8dvh,16px)] text-[clamp(13px,2.8dvh,24px)] font-semibold leading-tight text-ink-dim transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-[clamp(4px,1.6dvh,16px)] border-t border-white/10 px-6 pb-[clamp(8px,2.2dvh,32px)] pt-[clamp(4px,1.6dvh,24px)]">
                <div className="flex flex-col gap-[clamp(4px,1.2dvh,12px)]">
                  <a href="#roi" onClick={closeMenu}>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full py-[clamp(4px,1.5dvh,16px)] text-[clamp(12px,2.2dvh,16px)]"
                    >
                      Посчитать эффект
                    </Button>
                  </a>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full py-[clamp(4px,1.5dvh,16px)] text-[clamp(12px,2.2dvh,16px)]"
                    onClick={() => {
                      closeMenu();
                      openContactModal("Запросить демо");
                    }}
                  >
                    Запросить демо
                  </Button>
                </div>

                <a
                  href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`}
                  className="flex items-center justify-center gap-2 text-[clamp(12px,2.2dvh,20px)] font-semibold text-white"
                >
                  <Phone className="h-5 w-5 text-ink-faint" />
                  {CONTACT_PHONE}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
