import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, PiggyBank, Sparkles, Boxes, Globe, Layers } from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

const fmtCompact = (n: number) =>
  new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 1 }).format(n);

const fmtMillionsFrom = (n: number) => {
  const millions = Math.round((n / 1_000_000) * 10) / 10;
  const str = Number.isInteger(millions) ? millions.toString() : millions.toFixed(1).replace(".", ",");
  return `От ${str} млн ₽`;
};

const UNITS_MIN = 20;

type Package = {
  name: string;
  subtitle?: string;
  icon: typeof Boxes;
  baseCost: number;
  costStepPer10: number;
  release: string;
};

const packages: Package[] = [
  { name: "Интерактивный макет UE5", icon: Boxes, baseCost: 5_000_000, costStepPer10: 50_000, release: "От 4 мес" },
  { name: "Интерактивный макет WEB", icon: Globe, baseCost: 1_500_000, costStepPer10: 10_000, release: "От 1 мес" },
  {
    name: "Комплекс WEB + UE5",
    subtitle: "Экосистема и скоринг",
    icon: Layers,
    baseCost: 6_500_000,
    costStepPer10: 30_000,
    release: "От 4 мес",
  },
];

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
};

function Slider({ label, value, min, max, step, onChange, format }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[13.5px] font-medium text-ink-dim min-[1536px]:text-[15px]">{label}</span>
        <span className="text-[14px] font-semibold text-white min-[1536px]:text-[15.5px]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-white"
        style={{
          background: `linear-gradient(to right, #a5b4fc ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
        }}
      />
    </div>
  );
}

const outputs = [
  "Эффект отдельного модуля",
  "Эффект нескольких модулей",
  "Эффект полной экосистемы",
];

export default function RoiCalculator() {
  const [units, setUnits] = useState(200);
  const [price, setPrice] = useState(16000000);
  const [financing, setFinancing] = useState(13.5);
  const [period, setPeriod] = useState(24);
  const [conversion, setConversion] = useState(20);

  const results = useMemo(() => {
    const inventoryValue = units * price;
    const monthsSaved = period * 0.17;
    const improvedConversion = Math.min(conversion * 1.25, 100);
    const additionalRevenue = inventoryValue * ((improvedConversion - conversion) / 100);
    const financingSaved = inventoryValue * (financing / 100) * (monthsSaved / 12);
    const totalImpact = additionalRevenue + financingSaved;
    return { inventoryValue, monthsSaved, additionalRevenue, financingSaved, totalImpact };
  }, [units, price, financing, conversion, period]);

  const packageCosts = useMemo(
    () => packages.map((pkg) => pkg.baseCost + ((units - UNITS_MIN) / 10) * pkg.costStepPer10),
    [units]
  );

  return (
    <section id="roi" className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container className="flex flex-col items-center">
        <SectionHeading title="Калькулятор эффекта" />

        <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {outputs.map((o) => (
            <span key={o} className="rounded-full glass px-3.5 py-1.5 text-[12.5px] font-medium text-ink-dim">
              {o}
            </span>
          ))}
        </Reveal>

        <div className="mt-12 grid w-full grid-cols-1 gap-5 min-[1024px]:grid-cols-[minmax(0,380px)_1fr] min-[1536px]:gap-7 min-[1536px]:grid-cols-[minmax(0,440px)_1fr]">
          <Reveal className="h-full">
            <div className="glass flex h-full flex-col gap-7 rounded-3xl p-7 min-[1536px]:gap-8 min-[1536px]:p-9">
              <Slider
                label="Количество квартир"
                value={units}
                min={UNITS_MIN}
                max={620}
                step={10}
                onChange={setUnits}
                format={(v) => v.toString()}
              />
              <Slider
                label="Средний чек"
                value={price}
                min={3000000}
                max={30000000}
                step={100000}
                onChange={setPrice}
                format={fmtMoney}
              />
              <Slider
                label="Стоимость финансирования"
                value={financing}
                min={2}
                max={16}
                step={0.5}
                onChange={setFinancing}
                format={(v) => `${v}%`}
              />
              <Slider
                label="Плановый срок реализации"
                value={period}
                min={6}
                max={48}
                step={1}
                onChange={setPeriod}
                format={(v) => `${v} мес.`}
              />
              <Slider
                label="Текущая конверсия"
                value={conversion}
                min={2}
                max={40}
                step={1}
                onChange={setConversion}
                format={(v) => `${v}%`}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="glass-strong relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 min-[1536px]:gap-6 min-[1536px]:p-9">
              <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-indigo/30 to-cyan/10 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <span className="text-[13px] font-medium uppercase tracking-wide text-ink-faint min-[1536px]:text-[14.5px]">
                  Общая стоимость проекта
                </span>
                <Sparkles className="h-4 w-4 text-cyan" />
              </div>
              <div className="relative text-[34px] font-semibold text-white min-[640px]:text-[40px] min-[1536px]:text-[48px]">
                {fmtMoney(results.inventoryValue)}
              </div>

              <div className="relative grid grid-cols-1 gap-3 min-[640px]:grid-cols-3 min-[1536px]:gap-4">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 min-[1536px]:p-6">
                  <Clock className="h-4 w-4 text-cyan" />
                  <div className="mt-3 text-[22px] font-semibold text-white min-[1536px]:text-[26px]">
                    {results.monthsSaved.toFixed(1)} мес.
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-faint min-[1536px]:text-[13.5px]">Быстрее выход на продажу</div>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 min-[1536px]:p-6">
                  <TrendingUp className="h-4 w-4 text-cyan" />
                  <div className="mt-3 text-[22px] font-semibold text-white min-[1536px]:text-[26px]">
                    {fmtCompact(results.additionalRevenue)}
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-faint min-[1536px]:text-[13.5px]">Дополнительная выручка</div>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 min-[1536px]:p-6">
                  <PiggyBank className="h-4 w-4 text-cyan" />
                  <div className="mt-3 text-[22px] font-semibold text-white min-[1536px]:text-[26px]">
                    {fmtCompact(results.financingSaved)}
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-faint min-[1536px]:text-[13.5px]">Экономия на финансировании</div>
                </div>
              </div>

              <motion.div
                key={Math.round(results.totalImpact)}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="relative mt-1 flex flex-1 flex-col justify-center rounded-2xl bg-gradient-to-br from-indigo/20 via-violet/15 to-cyan/10 p-6 min-[1536px]:p-8"
              >
                <span className="text-[13px] font-medium text-ink-dim min-[1536px]:text-[14.5px]">Итоговый эффект</span>
                <span className="mt-1 text-[30px] font-semibold text-gradient min-[640px]:text-[36px] min-[1536px]:text-[44px]">
                  {fmtMoney(results.totalImpact)}
                </span>
                <span className="mt-1 text-[12px] text-ink-faint min-[1536px]:text-[13.5px]">
                  Оценка на основе типичных диапазонов по проектам INEGO.dev. Иллюстративный расчёт, не гарантия.
                </span>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid w-full grid-cols-1 gap-5 min-[768px]:grid-cols-3 min-[1536px]:mt-7 min-[1536px]:gap-7">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={0.05 * i} className="h-full">
              <div className="glass flex h-full flex-col rounded-3xl p-7 min-[1536px]:p-9">
                <pkg.icon className="h-5 w-5 text-cyan" />
                <div className="mt-4 text-[16px] font-semibold text-white min-[1536px]:text-[18px]">{pkg.name}</div>
                {pkg.subtitle && (
                  <div className="mt-1 text-[12.5px] text-ink-faint min-[1536px]:text-[13.5px]">{pkg.subtitle}</div>
                )}
                <div className="mt-5 flex flex-1 flex-col justify-end gap-3">
                  <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
                    <span className="text-[12.5px] text-ink-faint min-[1536px]:text-[13.5px]">Стоимость</span>
                    <span className="text-[15px] font-semibold text-white min-[1536px]:text-[16.5px]">
                      {fmtMillionsFrom(packageCosts[i])}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
                    <span className="text-[12.5px] text-ink-faint min-[1536px]:text-[13.5px]">Релиз</span>
                    <span className="text-[15px] font-semibold text-white min-[1536px]:text-[16.5px]">{pkg.release}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
