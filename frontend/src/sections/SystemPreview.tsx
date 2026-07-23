import { Download, PlayCircle } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { useDemoAction } from "../hooks/useDemoAction";
import { toRutubeEmbedUrl } from "../lib/rutube";

export default function SystemPreview({
  id = "demo",
  eyebrow = "О системе",
  title,
  description,
  audience,
  buttonLabel = "Запустить демо",
  showDemoButton = true,
  previewImage,
  previewVideoUrl,
  modalVideoUrl,
  downloadLabel,
  downloadHref,
  streamUrl,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  audience?: string[];
  buttonLabel?: string;
  /** Показывать ли основную кнопку демо (например, скрыть, если для модуля есть только downloadLabel) */
  showDemoButton?: boolean;
  previewImage?: string;
  previewVideoUrl?: string;
  modalVideoUrl?: string;
  /** Текст доп. кнопки для скачивания файла (например, "Смотреть результат") */
  downloadLabel?: string;
  /** Ссылка на файл, который скачается по клику на downloadLabel */
  downloadHref?: string;
  /** Если задано — кнопка демо открывает полноэкранный UE5-стрим в iframe вместо видео */
  streamUrl?: string;
}) {
  const openDemo = useDemoAction({ previewVideoUrl, modalVideoUrl, streamUrl });

  return (
    <section id={id} className="relative pt-28 min-[640px]:pt-36 min-[1536px]:pt-44 min-[1920px]:pt-52">
      <Container>
        <div className="grid grid-cols-1 gap-10 min-[1024px]:grid-cols-2 min-[1024px]:items-center min-[1536px]:gap-16">
          <Reveal className="relative">
            <span className="absolute -top-4 left-6 z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-[#08090d] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] min-[1536px]:px-5 min-[1536px]:py-2 min-[1536px]:text-[14.5px]">
              {eyebrow}
            </span>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] glass-strong min-[640px]:aspect-[16/11]">
              {previewVideoUrl ? (
                <iframe
                  src={toRutubeEmbedUrl(previewVideoUrl)}
                  title="Демо системы"
                  className="absolute inset-0 h-full w-full"
                  allow="clipboard-write; autoplay; fullscreen"
                  allowFullScreen
                  frameBorder={0}
                />
              ) : (
                <>
                  {previewImage ? (
                    <img src={previewImage} alt="Демо системы" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo/25 via-violet/20 to-cyan/15" />
                      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
                    </>
                  )}
                  <button
                    type="button"
                    aria-label={buttonLabel}
                    onClick={openDemo}
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105 min-[1536px]:h-20 min-[1536px]:w-20"
                  >
                    <div className="ml-1.5 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-[#0a0c13] min-[1536px]:border-y-[13px] min-[1536px]:border-l-[21px]" />
                  </button>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col items-start gap-5 min-[1536px]:gap-6">
            <h2 className="text-[30px] font-semibold leading-[1.15] text-white min-[640px]:text-[38px] min-[1536px]:text-[46px]">
              {title}
            </h2>
            <p className="max-w-[520px] text-[15.5px] leading-relaxed text-ink-dim min-[1536px]:max-w-[600px] min-[1536px]:text-[18px]">
              {description}
            </p>
            {audience && audience.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-medium text-ink-faint min-[1536px]:text-[14px]">Кому:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {audience.map((a) => (
                    <span
                      key={a}
                      className="rounded-full glass px-3.5 py-1.5 text-[12.5px] font-medium text-ink-dim min-[1536px]:text-[13.5px]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3">
              {showDemoButton && (
                <Button
                  variant="primary"
                  icon={<PlayCircle className="h-4 w-4" />}
                  onClick={openDemo}
                >
                  {buttonLabel}
                </Button>
              )}
              {downloadLabel && (
                <a href={downloadHref ?? "#"} download>
                  <Button variant={showDemoButton ? "secondary" : "primary"} icon={<Download className="h-4 w-4" />}>
                    {downloadLabel}
                  </Button>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
