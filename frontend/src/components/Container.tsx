import type { CSSProperties, ReactNode } from "react";

export default function Container({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`mx-auto w-full max-w-[1180px] px-6 min-[768px]:px-10 min-[1536px]:max-w-[1360px] min-[1536px]:px-14 min-[1920px]:max-w-[1580px] min-[1920px]:px-20 min-[2560px]:max-w-[1800px] ${className}`}
    >
      {children}
    </div>
  );
}
