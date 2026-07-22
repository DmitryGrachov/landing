import { createContext, useCallback, useContext, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail, User, X } from "lucide-react";
import Button from "./Button";

type ContactModalContextValue = {
  openContactModal: (title?: string) => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Оставьте заявку");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const openContactModal = useCallback((t?: string) => {
    setTitle(t ?? "Оставьте заявку");
    setSubmitted(false);
    setError(null);
    setName("");
    setEmail("");
    setIsOpen(true);
  }, []);

  const close = () => setIsOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: title }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Не получилось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong relative w-full max-w-[440px] overflow-hidden rounded-3xl p-6 min-[640px]:p-8"
            >
              <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-gradient-to-br from-indigo/30 via-violet/20 to-cyan/10 blur-3xl" />

              <button
                type="button"
                aria-label="Закрыть"
                onClick={close}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="relative flex flex-col items-center gap-4 py-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo/25 to-cyan/15 text-cyan">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div className="text-[19px] font-semibold text-white">Заявка отправлена</div>
                  <p className="max-w-[320px] text-[14px] leading-relaxed text-ink-dim">
                    Спасибо! Мы свяжемся с вами в ближайшее рабочее время.
                  </p>
                  <Button variant="secondary" onClick={close} className="mt-2">
                    Закрыть
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <h3 className="max-w-[320px] text-[22px] font-semibold leading-tight text-white min-[640px]:text-[26px]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-dim min-[640px]:text-[15px]">
                    Оставьте контакты — покажем, как экосистема будет работать на вашем проекте.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="text-[13px] font-medium text-ink-dim">Имя</span>
                      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-white/25 focus-within:bg-white/[0.05]">
                        <User className="h-4 w-4 shrink-0 text-ink-faint" />
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Как к вам обращаться?"
                          className="w-full bg-transparent text-[14.5px] text-white placeholder:text-ink-faint focus:outline-none"
                        />
                      </div>
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-[13px] font-medium text-ink-dim">Email</span>
                      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-white/25 focus-within:bg-white/[0.05]">
                        <Mail className="h-4 w-4 shrink-0 text-ink-faint" />
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full bg-transparent text-[14.5px] text-white placeholder:text-ink-faint focus:outline-none"
                        />
                      </div>
                    </label>

                    {error && <p className="text-[13px] text-red-300">{error}</p>}

                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-2 w-full"
                      disabled={isSubmitting}
                      icon={
                        isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )
                      }
                    >
                      {isSubmitting ? "Отправляем…" : "Отправить"}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactModalContext.Provider>
  );
}
