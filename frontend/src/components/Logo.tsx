export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="text-[22px] font-semibold tracking-tight text-white font-display">
        INEGO<span className="text-[17px] font-medium text-ink-dim">.dev</span>
      </span>
    </div>
  );
}
