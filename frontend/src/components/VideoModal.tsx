import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { toRutubeEmbedUrl, DEMO_VIDEO_URL } from "../lib/rutube";

type VideoModalContextValue = {
  openVideoModal: (url?: string) => void;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) throw new Error("useVideoModal must be used within VideoModalProvider");
  return ctx;
}

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(DEMO_VIDEO_URL);

  const openVideoModal = useCallback((videoUrl?: string) => {
    setUrl(videoUrl ?? DEMO_VIDEO_URL);
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
    <VideoModalContext.Provider value={{ openVideoModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-[640px]:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={close} />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[980px]"
            >
              <button
                type="button"
                aria-label="Закрыть"
                onClick={close}
                className="glass-strong absolute -top-[52px] left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] transition-all hover:scale-105 hover:bg-white/[0.14] min-[640px]:-top-16 min-[640px]:h-12 min-[640px]:w-12"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-video overflow-hidden rounded-2xl glass-strong min-[640px]:rounded-[28px]">
                <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-gradient-to-br from-indigo/30 via-violet/20 to-cyan/10 blur-3xl" />
                {isOpen && (
                  <iframe
                    src={toRutubeEmbedUrl(url, true)}
                    title="Демо системы"
                    className="absolute inset-0 h-full w-full"
                    allow="clipboard-write; autoplay; fullscreen"
                    allowFullScreen
                    frameBorder={0}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}
