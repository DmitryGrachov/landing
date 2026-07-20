export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="#11131c" />
        <path d="M24 8 L38 16 V32 L24 40 L10 32 V16 Z" stroke="url(#logo-g)" strokeWidth="2" fill="none" />
        <path d="M24 8 V24 M24 24 L38 16 M24 24 L10 16 M24 24 V40" stroke="url(#logo-g)" strokeWidth="1.5" opacity="0.5" />
        <circle cx="24" cy="24" r="3.5" fill="url(#logo-g)" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-white font-display">Nexus</span>
    </div>
  );
}
