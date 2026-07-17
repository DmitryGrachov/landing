import { createContext, useContext } from "react";

export type LightboxContextValue = {
  open: (src: string) => void;
};

export const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}
