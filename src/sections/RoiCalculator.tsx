import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, PiggyBank, Sparkles } from "lucide-react";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

const fmtCompact = (n: number) =>
  new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 1 }).format(n);

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
        <span className="text-[13.5px] font-medium text-ink-dim">{label}</span>
        <span className="text-[14px] font-semibold text-white">{format(value)}</span>
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
  const [units, setUnits] = useState(120);
  const [price, setPrice] = useState(9000000);
  const [financing, setFinancing] = useState(8);
  const [period, setPeriod] = useState(18);
  const [conversion, setConversion] = useState(12);

  const results = useMemo(() => {
    const inventoryValue = units * price;
    const monthsSaved = period * 0.17;
    const improvedConversion = Math.min(conversion * 1.25, 100);
    const additionalRevenue = inventoryValue * ((improvedConversion - conversion) / 100);
    const financingSaved = inventoryValue * (financing / 100) * (monthsSaved / 12);
    const totalImpact = additionalRevenue + financingSaved;
    return { inventoryValue, monthsSaved, additionalRevenue, financingSaved, totalImpact };
  }, [units, price, financing, conversion, period]);

  return (
    <section id="roi" className="relative py-28 sm:py-36">
      <Container className="flex flex-col items-center">
        <SectionHeading eyebrow="Калькулятор" title="Калькулятор эффекта" />

        <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {outputs.map((o) => (
            <span key={o} className="rounded-full glass px-3.5 py-1.5 text-[12.5px] font-medium text-ink-dim">
              {o}
            </span>
          ))}
        </Reveal>

        <div className="mt-12 grid w-full grid-cols-1 gap-5 lg:grid-cols-[minmax(0,380px)_1fr]">
          <Reveal className="h-full">
            <div className="glass flex h-full flex-col gap-7 rounded-3xl p-7">
              <Slider
                label="Количество квартир"
                value={units}
                min={20}
                max={600}
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
            <div className="glass-strong relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7">
              <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-indigo/30 to-cyan/10 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <span className="text-[13px] font-medium uppercase tracking-wide text-ink-faint">
                  Общая стоимость проекта
                </span>
                <Sparkles className="h-4 w-4 text-cyan" />
              </div>
              <div className="relative text-[34px] font-semibold text-white sm:text-[40px]">
                {fmtMoney(results.inventoryValue)}
              </div>

              <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <Clock className="h-4 w-4 text-cyan" />
                  <div className="mt-3 text-[22px] font-semibold text-white">
                    {results.monthsSaved.toFixed(1)} мес.
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-faint">Быстрее выход на продажу</div>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <TrendingUp className="h-4 w-4 text-cyan" />
                  <div className="mt-3 text-[22px] font-semibold text-white">
                    {fmtCompact(results.additionalRevenue)}
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-faint">Дополнительная выручка</div>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <PiggyBank className="h-4 w-4 text-cyan" />
                  <div className="mt-3 text-[22px] font-semibold text-white">
                    {fmtCompact(results.financingSaved)}
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-faint">Экономия на финансировании</div>
                </div>
              </div>

              <motion.div
                key={Math.round(results.totalImpact)}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="relative mt-1 flex flex-1 flex-col justify-center rounded-2xl bg-gradient-to-br from-indigo/20 via-violet/15 to-cyan/10 p-6"
              >
                <span className="text-[13px] font-medium text-ink-dim">Итоговый эффект</span>
                <span className="mt-1 text-[30px] font-semibold text-gradient sm:text-[36px]">
                  {fmtMoney(results.totalImpact)}
                </span>
                <span className="mt-1 text-[12px] text-ink-faint">
                  Оценка на основе типичных диапазонов по проектам Nexus. Иллюстративный расчёт, не гарантия.
                </span>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
