import { motion } from "framer-motion";
import Container from "../components/Container";
import Button from "../components/Button";
import { ArrowRight, Calculator, PlayCircle } from "lucide-react";
import { useContactModal } from "../components/ContactModal";
import { useVideoModal } from "../components/VideoModal";

export default function Hero() {
  const { openContactModal } = useContactModal();
  const { openVideoModal } = useVideoModal();

  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-20 min-[640px]:pt-48 min-[640px]:pb-28 min-[1536px]:pt-56 min-[1536px]:pb-36 min-[1920px]:pt-64 min-[1920px]:pb-44">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo/25 via-violet/20 to-transparent blur-3xl min-[1920px]:h-[720px] min-[1920px]:w-[1160px]" />

      <Container className="relative flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1040px] text-[38px] font-semibold leading-[1.08] text-white min-[640px]:text-[54px] min-[768px]:text-[64px] min-[1536px]:max-w-[1220px] min-[1536px]:text-[78px] min-[1920px]:max-w-[1380px] min-[1920px]:text-[92px] min-[2560px]:text-[104px]"
        >
          Ускоряем продажи новостроек через <span className="text-gradient">единую цифровую экосистему</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[700px] text-[17px] leading-relaxed text-ink-dim min-[640px]:text-[19px] min-[1536px]:max-w-[840px] min-[1536px]:text-[22px] min-[1920px]:max-w-[920px] min-[1920px]:text-[25px]"
        >
          Создаём визуализацию, видео, сайт проекта, интерактивный выбор квартир, UE5-презентацию и CRM-аналитику на базе одного цифрового объекта.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-[760px] text-[14.5px] leading-relaxed text-ink-faint min-[640px]:text-[15px] min-[1536px]:max-w-[900px] min-[1536px]:text-[17px] min-[1920px]:max-w-[1000px] min-[1920px]:text-[19px]"
        >
          Мы объединяем маркетинг, продажи и аналитику в одну систему. Покупатель проходит путь от первого знакомства с ЖК до выбора квартиры, а отдел продаж получает не просто заявку, а контекст: чем интересовался клиент, какие лоты смотрел, что сохранял и на каком этапе принял решение.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col flex-wrap items-center justify-center gap-3 min-[768px]:flex-row min-[1536px]:mt-14 min-[1536px]:gap-4"
        >
          <Button
            variant="primary"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => openVideoModal()}
          >
            Смотреть демо
          </Button>
          <a href="#roi">
            <Button variant="secondary" icon={<Calculator className="h-4 w-4" />}>
              Посчитать эффект
            </Button>
          </a>
          <Button
            variant="ghost"
            size="md"
            icon={<PlayCircle className="h-4 w-4" />}
            onClick={() => openContactModal("Обсудить запуск")}
          >
            Обсудить запуск
          </Button>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full min-[1536px]:mt-28"
        >
          <HeroVisual />
        </motion.div> */}
      </Container>
    </section>
  );
}
