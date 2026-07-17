import { categories } from "../../data";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-[90px] bg-white px-6 pb-10 pt-14 min-[480px]:pt-[150px] min-[480px]:pb-14">
      <p className="text-[10px] font-semibold text-black min-[480px]:text-[18px]">Портфолио</p>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 min-[480px]:mt-12 min-[480px]:gap-x-16">
        {categories.map((c, i) => (
          <a
            key={c.href}
            href={c.href}
            className="text-[20px] font-bold leading-[1.55] tracking-[-1px] transition-opacity hover:opacity-70 min-[480px]:text-[36px]"
            style={{ color: i === 0 ? "rgb(17,17,17)" : "rgb(220,220,220)" }}
          >
            {c.label}
          </a>
        ))}
      </div>
    </section>
  );
}
