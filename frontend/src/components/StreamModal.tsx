import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type StreamModalContextValue = {
  openStreamModal: (url: string) => void;
};

const StreamModalContext = createContext<StreamModalContextValue | null>(null);

export function useStreamModal() {
  const ctx = useContext(StreamModalContext);
  if (!ctx) throw new Error("useStreamModal must be used within StreamModalProvider");
  return ctx;
}

export function StreamModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const openStreamModal = useCallback((streamUrl: string) => {
    setUrl(streamUrl);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <StreamModalContext.Provider value={{ openStreamModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 min-[640px]:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={close} />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[94vh] w-full max-w-[1800px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl glass-strong min-[640px]:rounded-[28px]">
                {isOpen && url && (
                  <iframe
                    src={url}
                    title="UE5 стрим"
                    className="absolute inset-0 h-full w-full"
                    allow="clipboard-write; autoplay; fullscreen"
                    allowFullScreen
                    frameBorder={0}
                  />
                )}

                <button
                  type="button"
                  aria-label="Закрыть"
                  onClick={close}
                  className="glass-strong absolute right-3 top-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] transition-all hover:scale-105 hover:bg-white/[0.14] min-[640px]:right-4 min-[640px]:top-4 min-[640px]:h-12 min-[640px]:w-12"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </StreamModalContext.Provider>
  );
}
