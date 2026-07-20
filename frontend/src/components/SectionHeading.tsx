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
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-ink-dim uppercase min-[1536px]:px-4 min-[1536px]:py-2 min-[1536px]:text-[13px]">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo to-cyan" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="max-w-[920px] text-[32px] font-semibold leading-[1.15] text-white min-[640px]:text-[40px] min-[768px]:text-[48px] min-[1536px]:max-w-[1080px] min-[1536px]:text-[56px] min-[1920px]:max-w-[1220px] min-[1920px]:text-[64px]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="max-w-[680px] text-[16px] leading-relaxed text-ink-dim min-[768px]:text-[17px] min-[1536px]:max-w-[800px] min-[1536px]:text-[20px] min-[1920px]:max-w-[880px] min-[1920px]:text-[22px]">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
