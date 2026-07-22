import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { useContactModal } from "./ContactModal";

const links = [
  { label: "Экосистема", href: "#ecosystem" },
  { label: "Почему мы", href: "#why" },
  { label: "Эффект", href: "#impact" },
  { label: "Калькулятор", href: "#roi" },
  { label: "Внедрение", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <Container className="pt-4 min-[1536px]:pt-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 min-[1536px]:px-6 min-[1536px]:py-4 ${
            scrolled ? "glass-strong shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent"
          }`}
        >
          <a href="#top" className="shrink-0">
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
            <Button
              variant="primary"
              size="md"
              className="whitespace-nowrap"
              onClick={() => openContactModal("Запросить демо")}
            >
              Запросить демо
            </Button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
