import { motion } from "framer-motion";

type Panel = {
  id: string;
  x: number;
  y: number;
  delay: number;
  anchor: [number, number];
  content: React.ReactNode;
  className?: string;
};

const bars = [42, 68, 50, 88, 60];

const panels: Panel[] = [
  {
    id: "selection",
    x: 13,
    y: 20,
    delay: 0.2,
    anchor: [50, 50],
    content: (
      <div className="w-[150px] min-[640px]:w-[176px] min-[768px]:w-[192px] min-[1536px]:w-[224px] min-[1920px]:w-[256px]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[10.5px] font-medium tracking-wide text-ink-dim">ВЫБОР КВАРТИР</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 12 }).map((_, i) => {
            const state = [2, 5, 9].includes(i) ? "sold" : [3, 7].includes(i) ? "reserved" : "available";
            return (
              <div
                key={i}
                className={`h-3.5 rounded-[3px] ${
                  state === "sold"
                    ? "bg-white/[0.06]"
                    : state === "reserved"
                    ? "bg-amber/60"
                    : "bg-gradient-to-br from-indigo/80 to-cyan/70"
                }`}
              />
            );
          })}
        </div>
        <div className="mt-2.5 flex gap-3 text-[9px] text-ink-faint">
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo to-cyan" />Свободно</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber/60" />Бронь</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white/20" />Продано</span>
        </div>
      </div>
    ),
  },
  {
    id: "crm",
    x: 87,
    y: 16,
    delay: 0.35,
    anchor: [50, 50],
    content: (
      <div className="w-[150px] min-[640px]:w-[176px] min-[768px]:w-[192px] min-[1536px]:w-[224px] min-[1920px]:w-[256px]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[10.5px] font-medium tracking-wide text-ink-dim">CRM · ВОРОНКА</span>
        </div>
        <div className="flex h-11 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[3px] bg-gradient-to-t from-indigo/40 to-violet"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-[15px] font-semibold text-white">247</span>
          <span className="text-[10px] text-ink-faint">заявки · +18%</span>
        </div>
      </div>
    ),
  },
  {
    id: "ue5",
    x: 12,
    y: 82,
    delay: 0.5,
    anchor: [50, 50],
    content: (
      <div className="w-[150px] min-[640px]:w-[176px] min-[768px]:w-[192px] min-[1536px]:w-[224px] min-[1920px]:w-[256px]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[10.5px] font-medium tracking-wide text-ink-dim">UE5-ТУР</span>
          <span className="flex items-center gap-1 rounded-full bg-red-500/15 px-1.5 py-0.5 text-[8.5px] font-medium text-red-300">
            <span className="h-1 w-1 rounded-full bg-red-400" /> ОНЛАЙН
          </span>
        </div>
        <div className="relative h-14 overflow-hidden rounded-lg bg-gradient-to-br from-indigo/25 via-violet/20 to-cyan/15">
          <div className="absolute inset-0 grid-fade opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <div className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-[#0a0c13]" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "account",
    x: 88,
    y: 84,
    delay: 0.65,
    anchor: [50, 50],
    content: (
      <div className="w-[150px] min-[640px]:w-[176px] min-[768px]:w-[192px] min-[1536px]:w-[224px] min-[1920px]:w-[256px]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[10.5px] font-medium tracking-wide text-ink-dim">ЛИЧНЫЙ КАБИНЕТ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-violet to-cyan" />
          <div className="min-w-0">
            <div className="truncate text-[11.5px] font-medium text-white">А. Петрова</div>
            <div className="text-[9.5px] text-ink-faint">Кв. B-1204</div>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1">
          {["Выбрана", "Бронь", "Договор"].map((step, i) => (
            <div key={step} className="flex flex-1 items-center gap-1">
              <div className={`h-1 flex-1 rounded-full ${i < 2 ? "bg-gradient-to-r from-indigo to-cyan" : "bg-white/10"}`} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[640px] min-[1536px]:max-w-[760px] min-[1920px]:max-w-[880px] min-[2560px]:max-w-[1000px]">
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {panels.map((p) => (
          <g key={p.id}>
            <path
              d={`M ${p.anchor[0]} ${p.anchor[1]} Q ${(p.anchor[0] + p.x) / 2} ${p.y + (p.anchor[1] - p.y) * 0.15}, ${p.x} ${p.y}`}
              fill="none"
              stroke="url(#line-g)"
              strokeWidth="0.18"
              strokeDasharray="1.4 1.6"
              opacity="0.55"
              vectorEffect="non-scaling-stroke"
            />
            <circle r="0.7" fill="#e0e7ff" opacity="0.9">
              <animateMotion
                dur="3.2s"
                begin={`${p.delay}s`}
                repeatCount="indefinite"
                path={`M ${p.anchor[0]} ${p.anchor[1]} Q ${(p.anchor[0] + p.x) / 2} ${p.y + (p.anchor[1] - p.y) * 0.15}, ${p.x} ${p.y}`}
              />
            </circle>
          </g>
        ))}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex h-[168px] w-[168px] items-center justify-center min-[640px]:h-[200px] min-[640px]:w-[200px] min-[1536px]:h-[240px] min-[1536px]:w-[240px] min-[1920px]:h-[280px] min-[1920px]:w-[280px]">
          <div className="absolute h-full w-full rounded-full bg-gradient-to-br from-indigo/25 via-violet/20 to-cyan/10 blur-2xl" />
          <motion.svg
            viewBox="0 0 100 100"
            className="relative h-full w-full animate-float"
          >
            <defs>
              <linearGradient id="hub-g" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a5b4fc" />
                <stop offset="55%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
            </defs>
            <path d="M50 8 L88 29 V71 L50 92 L12 71 V29 Z" stroke="url(#hub-g)" strokeWidth="1.4" fill="rgba(255,255,255,0.02)" />
            <path d="M50 8 V50 M50 50 L88 29 M50 50 L12 29 M50 50 V92" stroke="url(#hub-g)" strokeWidth="0.7" opacity="0.45" />
            {[24, 34, 44, 56, 66, 76].map((y, i) => (
              <line key={i} x1={i % 2 === 0 ? 15 : 55} y1={y} x2={i % 2 === 0 ? 45 : 85} y2={y} stroke="url(#hub-g)" strokeWidth="0.5" opacity="0.3" />
            ))}
            <circle cx="50" cy="50" r="6" fill="url(#hub-g)" className="animate-pulse-slow" />
          </motion.svg>
        </div>
      </motion.div>

      {panels.map((p) => (
        <motion.div
          key={p.id}
          className="glass absolute rounded-2xl p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] min-[1536px]:p-4 min-[1920px]:p-5"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6 + p.delay * 2, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            {p.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
