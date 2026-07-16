import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-5 ${alignCls} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-ink-dim uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo to-cyan" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-[32px] leading-[1.15] sm:text-[40px] md:text-[48px] font-semibold text-white max-w-[720px]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="max-w-[560px] text-[16px] md:text-[17px] leading-relaxed text-ink-dim">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
