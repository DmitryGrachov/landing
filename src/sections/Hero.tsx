import { motion } from "framer-motion";
import Container from "../components/Container";
import Button from "../components/Button";
import HeroVisual from "../components/HeroVisual";
import { ArrowRight, Calculator, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-20 min-[640px]:pt-48 min-[640px]:pb-28 min-[1536px]:pt-56 min-[1536px]:pb-36 min-[1920px]:pt-64 min-[1920px]:pb-44">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo/25 via-violet/20 to-transparent blur-3xl min-[1920px]:h-[720px] min-[1920px]:w-[1160px]" />

      <Container className="relative flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[13px] font-medium text-ink-dim min-[1536px]:px-5 min-[1536px]:py-2 min-[1536px]:text-[14.5px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo to-cyan animate-pulse-slow" />
          Единая цифровая экосистема
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-[880px] text-[38px] font-semibold leading-[1.08] text-white min-[640px]:text-[54px] min-[768px]:text-[64px] min-[1536px]:max-w-[1080px] min-[1536px]:text-[78px] min-[1920px]:max-w-[1240px] min-[1920px]:text-[92px] min-[2560px]:text-[104px]"
        >
          Ускоряем продажи новостроек через <span className="text-gradient">единую цифровую экосистему</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-ink-dim min-[640px]:text-[19px] min-[1536px]:max-w-[720px] min-[1536px]:text-[22px] min-[1920px]:max-w-[800px] min-[1920px]:text-[25px]"
        >
          Создаём визуализацию, видео, сайт проекта, интерактивный выбор квартир, UE5-презентацию и CRM-аналитику на базе одного цифрового объекта.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-[640px] text-[14.5px] leading-relaxed text-ink-faint min-[640px]:text-[15px] min-[1536px]:max-w-[760px] min-[1536px]:text-[17px] min-[1920px]:max-w-[840px] min-[1920px]:text-[19px]"
        >
          Мы объединяем маркетинг, продажи и аналитику в одну систему. Покупатель проходит путь от первого знакомства с ЖК до выбора квартиры, а отдел продаж получает не просто заявку, а контекст: чем интересовался клиент, какие лоты смотрел, что сохранял и на каком этапе принял решение.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col flex-wrap items-center justify-center gap-3 min-[768px]:flex-row min-[1536px]:mt-14 min-[1536px]:gap-4"
        >
          <a href="#final-cta">
            <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
              Смотреть демо
            </Button>
          </a>
          <a href="#roi">
            <Button variant="secondary" icon={<Calculator className="h-4 w-4" />}>
              Посчитать эффект
            </Button>
          </a>
          <a href="#final-cta">
            <Button variant="ghost" size="md" icon={<PlayCircle className="h-4 w-4" />}>
              Обсудить запуск
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full min-[1536px]:mt-28"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}
