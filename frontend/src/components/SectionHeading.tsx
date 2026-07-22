import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-5 ${alignCls} ${className}`}>
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
