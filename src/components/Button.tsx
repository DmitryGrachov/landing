import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap select-none";

const sizes = {
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-6 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-[#08090d] hover:bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-8px_rgba(255,255,255,0.25)] hover:-translate-y-0.5",
  secondary:
    "glass text-white hover:bg-white/[0.09] hover:-translate-y-0.5",
  ghost:
    "text-ink-dim hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  size = "lg",
  icon,
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
