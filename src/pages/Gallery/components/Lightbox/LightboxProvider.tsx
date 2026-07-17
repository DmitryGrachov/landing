import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { LightboxContext } from "../../hooks/useLightbox";

export default function LightboxProvider({ children }: { children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);

  return (
    <LightboxContext.Provider value={{ open: setSrc }}>
      {children}
      {src && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={() => setSrc(null)}
        >
          <button
            onClick={() => setSrc(null)}
            aria-label="Закрыть"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={src}
            alt=""
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </LightboxContext.Provider>
  );
}
