import { motion } from "framer-motion";
import { ArrowRight, Calculator, MessageSquare } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Reveal from "../components/Reveal";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative py-28 sm:py-36">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] glass-strong px-8 py-16 text-center sm:px-16 sm:py-24">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo/30 via-violet/25 to-cyan/10 blur-3xl" />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-[640px] text-[32px] font-semibold leading-tight text-white sm:text-[44px]"
            >
              Покажем, как это работает на вашем проекте
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mx-auto mt-5 max-w-[480px] text-[16px] text-ink-dim"
            >
              Сначала демонстрация, затем расчёт эффекта, потом запуск выбранных модулей.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
                Запросить демо
              </Button>
              <a href="#roi">
                <Button variant="secondary" icon={<Calculator className="h-4 w-4" />}>
                  Посчитать ROI
                </Button>
              </a>
              <Button variant="secondary" icon={<MessageSquare className="h-4 w-4" />}>
                Обсудить комплексный запуск
              </Button>
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
