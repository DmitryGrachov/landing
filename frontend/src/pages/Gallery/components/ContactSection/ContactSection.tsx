import { Send } from "lucide-react";
import type { SocialLink } from "../../types";

export default function ContactSection({ phone, socials }: { phone: string; socials: SocialLink[] }) {
  return (
    <section id="contacts" className="scroll-mt-[90px] border-t border-black/10 bg-white px-6 py-14 min-[480px]:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 text-center">
        <span className="text-[28px] font-bold tracking-tight text-black min-[480px]:text-[36px]">{phone}</span>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[13px] font-semibold text-black transition-colors hover:bg-black/10"
            >
              {s.label === "telegram" ? <Send className="h-4 w-4" /> : s.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
