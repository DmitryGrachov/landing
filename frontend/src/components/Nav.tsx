import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { useContactModal } from "./ContactModal";

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
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Container className="pt-4 min-[1536px]:pt-6">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 min-[1536px]:px-6 min-[1536px]:py-4 ${
              scrolled ? "glass-strong shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent"
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="min-[1280px]:hidden"
            >
              <Container className="pt-2">
                <nav className="flex flex-col gap-1 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-[#14161f] to-[#0a0c13] p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={closeMenu}
                      className="rounded-xl px-4 py-3 text-[15px] font-medium text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {l.label}
                    </a>
                  ))}
                  <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
                    <a href="#roi" onClick={closeMenu}>
                      <Button variant="secondary" size="md" className="w-full">
                        Посчитать эффект
                      </Button>
                    </a>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => {
                        closeMenu();
                        openContactModal("Запросить демо");
                      }}
                    >
                      Запросить демо
                    </Button>
                  </div>
                </nav>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
