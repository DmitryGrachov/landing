import type { LucideIcon } from "lucide-react";

// The source page's "Видео" and "ПО/UE" categories are rendered greyed-out /
// inactive with no corresponding gallery content anywhere in the DOM.
// TODO: replace these placeholder cards with real content once it exists.
export default function PlaceholderSection({
  id,
  label,
  icon: Icon,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <section id={id} className="scroll-mt-[90px] bg-white">
      <p className="mb-6 px-6 text-[13px] font-semibold uppercase tracking-[0.15em] text-black/40 min-[480px]:px-10">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-0 min-[480px]:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex aspect-square items-center justify-center bg-black/5 text-black/25">
            <Icon className="h-9 w-9" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </section>
  );
}
