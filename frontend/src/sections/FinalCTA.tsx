import { motion } from "framer-motion";
import { Calculator, MessageSquare } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { useContactModal } from "../components/ContactModal";

export default function FinalCTA() {
  const { openContactModal } = useContactModal();

  return (
    <section id="final-cta" className="relative py-28 min-[640px]:py-36 min-[1536px]:py-44 min-[1920px]:py-52">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] glass-strong px-8 py-16 text-center min-[640px]:px-16 min-[640px]:py-24 min-[1536px]:px-20 min-[1536px]:py-32">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo/30 via-violet/25 to-cyan/10 blur-3xl min-[1920px]:h-[540px] min-[1920px]:w-[920px]" />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-[760px] text-[32px] font-semibold leading-tight text-white min-[640px]:text-[44px] min-[1536px]:max-w-[880px] min-[1536px]:text-[54px]"
            >
              Покажем, как это работает на вашем проекте
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mx-auto mt-5 max-w-[560px] text-[16px] text-ink-dim min-[1536px]:max-w-[640px] min-[1536px]:text-[19px]"
            >
              Сначала демонстрация, затем расчёт эффекта, потом запуск выбранных модулей.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-10 flex flex-col flex-wrap items-center justify-center gap-3 min-[768px]:flex-row min-[1536px]:mt-14 min-[1536px]:gap-4"
            >
              <a href="#roi">
                <Button variant="secondary" icon={<Calculator className="h-4 w-4" />}>
                  Посчитать ROI
                </Button>
              </a>
              <Button
                variant="secondary"
                icon={<MessageSquare className="h-4 w-4" />}
                onClick={() => openContactModal("Обсудить комплексный запуск")}
              >
                Обсудить комплексный запуск
              </Button>
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
