import type { LucideIcon } from "lucide-react";
import { Building2, Sofa, Square, DoorOpen, Trees, Search, Calculator, TabletSmartphone, Blocks, Sun, Rows3, Film, Fence, FileBox } from "lucide-react";
import { DEMO_VIDEO_URL } from "../lib/rutube";

const STREAM_URL = "https://stream.inego.net:7741/";

export type FeatureCard = {
  title: string;
  description: string;
  /** Картинка (jpg/png/webp) или видео (webm/mp4) для превью карточки — тип определяется по расширению файла */
  media?: string;
  icon: LucideIcon;
};

/**
 * Описание модуля: либо просто текст, либо список пунктов
 * (с необязательным текстом под ним, например для доп. пояснения).
 */
export type ModuleDescription =
  | string
  | {
    bullets: string[];
    text?: string;
  };

export type SystemModule = {
  /** Уникальный id секции (используется как #anchor и React key) */
  id: string;
  eyebrow: string;
  title: string;
  description: ModuleDescription;
  /** Короткие теги "кому подходит модуль", показываются над кнопкой */
  audience?: string[];
  buttonLabel?: string;
  /** Показывать ли основную кнопку демо (например, скрыть, если для модуля есть только downloadLabel) */
  showDemoButton?: boolean;
  /** Видео, показанное встроенным на старте (в блоке SystemPreview) */
  previewVideoUrl?: string;
  /** Картинка-заглушка, если previewVideoUrl не задан */
  previewImage?: string;
  /** Видео, которое откроется в модалке — если не задано, берётся previewVideoUrl */
  modalVideoUrl?: string;
  /** Текст доп. кнопки для скачивания файла (например, "Смотреть результат") */
  downloadLabel?: string;
  /** Ссылка на файл (бланк), который скачается по клику на downloadLabel */
  downloadHref?: string;
  /** Если задано — кнопка демо открывает полноэкранный UE5 pixel-streaming в iframe вместо видео */
  streamUrl?: string;
  featuresHeading: string;
  features: FeatureCard[];
};

export const systemModules: SystemModule[] = [
  {
    id: "1",
    eyebrow: "О системе",
    title: "Интерактивный макет UE5",
    description: {
      bullets: [
        "Размещение макета на интерактивной панели в офисе продаж одного комплекса или нескольких ЖК на карте города с сквозной фильтрацией",
        "Удаленная демонстрация Pixel Streaming UE5 — 1 канал = 1 переговорная, бронирование конференции, возможность увеличения количества сессий, если поток возрос",
      ],
    },
    audience: ["Отдел продаж", "Горячие лиды", "Агенты"],
    previewVideoUrl: DEMO_VIDEO_URL,
    // TODO: тестовая ссылка на UE5 pixel-streaming, замените на боевую
    streamUrl: STREAM_URL,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Обзор жилого комплекса",
        description: "Описание",
        icon: Building2,
        media: "/video/UE/Webm/review.webm",
      },
      {
        title: "Прогулка по Благоустройству",
        description: "Описание",
        icon: Trees,
        media: "/video/UE/Webm/proguilki.webm",
      },
      {
        title: "Тур по Интерьерам квартир",
        description: "Описание",
        icon: Sofa,
        media: "/video/UE/Webm/Inter.webm",
      },
      {
        title: "Реальный вид из окна",
        description: "Описание",
        icon: DoorOpen,
        media: "/video/UE/Webm/windows.webm",
      },
      {
        title: "3D Планы этажей",
        description: "Описание",
        icon: Square,
        media: "/video/UE/Webm/florrs.webm",
      },
      {
        title: "Движение солнца и теней ",
        description: "Описание",
        icon: Sun,
        media: "/video/UE/Webm/svet.webm",
      },
      {
        title: "Поиск недвижимости",
        description: "Описание",
        icon: Search,
        media: "/video/UE/Webm/poisk.webm",
      },
      {
        title: "Кредитный калькулятор",
        description: "Описание",
        icon: Calculator,
        media: "/video/UE/Webm/ipoteka.webm",
      },
      {
        title: "Интеграция с CRM",
        description: "Описание",
        icon: Blocks,
        media: "/video/UE/Webm/srm.webm",
      },
      {
        title: "Доступность на ПК и WEB",
        description: "Описание",
        icon: TabletSmartphone,
        media: "/video/UE/Webm/inegraz-converted.webm",
      },
    ],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "2",
    eyebrow: "О системе",
    title: "Интерактивный макет WEB",
    description: {
      bullets: [
        "Использует мощности индивидуального устройства, а не Pixel Streaming",
        "Нет ограничений по количеству сессий",
        "Интегрируется в сайт ЖК или доступ по ссылке",
        "Обладает 90% функционала макета UE5",
      ],
    },
    audience: ["Отдел продаж", "Холодные лиды", "Горячие лиды", "Агенты"],
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    streamUrl: STREAM_URL,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Доступность на Смартфонах, Планшетах и ПК",
        description: "Описание",
        icon: TabletSmartphone,
        media: "/video/mobile/Webm/integrazion.webm",
      },
      {
        title: "Обзор жилого комплекса",
        description: "Описание",
        icon: Building2,
        media: "/video/mobile/Webm/view.webm",
      },
      {
        title: "Поиск недвижимости",
        description: "Описаниея",
        icon: Search,
        media: "/video/mobile/Webm/poiskhat.webm",
      },
      {
        title: "Планы этажей",
        description: "Описание",
        icon: Square,
        media: "/video/mobile/Webm/mobile.webm",
      },
      {
        title: "Реальный вид из окна",
        description: "Описание",
        icon: DoorOpen,
        media: "/video/mobile/Webm/vidizokna.webm",
      },
      {
        title: "Прогулка по Благоустройству",
        description: "Описание",
        icon: Trees,
        media: "/video/mobile/Webm/progilki.webm",
      },
      {
        title: "Интеграция с CRM",
        description: "Описание",
        icon: Blocks,
        media: "/video/mobile/Webm/crmmovile.webm",
      },
      {
        title: "Кредитный калькулятор",
        description: "Описание",
        icon: Calculator,
        media: "/video/UE/Webm/ipoteka.webm",
      },
      {
        title: "Тур по Интерьерам квартир",
        description: "Описание",
        icon: Sofa,
      },
    ],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "3",
    eyebrow: "О системе",
    title: "Единая цифровая Экосистема",
    description: {
      bullets: [
        "«Мост» между WEB и UE5 макетом добавляет конверсии в посещения офиса продаж или записи на встречу, для более углублённого изучения понравившихся лотов",
        "Сбор и обработка поведенческих данных сессий - «цифровой след» клиента для отдела продаж или агентов",
        "Сохранение контекста поиска недвижимости покупателем в онлайн сессиях с учётом любого количества взаимодействий",
      ],
    },
    audience: ["Отдел продаж", "Агенты"],
    showDemoButton: false,
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    // TODO: подставить реальную ссылку на бланк, когда файл будет готов
    downloadLabel: "Результат сессии",
    downloadHref: undefined,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Личный кабинет покупателя",
        description: "Описание",
        icon: Building2,
        media: "/video/eco/LK.webm",
      },
      {
        title: "Сохранение избранного",
        description: "Описание",
        icon: Building2,
        media: "/video/eco/isbranoe.webm",
      },
      {
        title: "Аналитика сессий",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Аналитика поведения",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Скоринг",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Передача данных в СРМ",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Тепловая карта интереса аудитории",
        description: "Описание",
        icon: Building2,
      },
    ],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "4",
    eyebrow: "О системе",
    title: "Визуализация и Видеопродакшн",
    description: {
      bullets: [
        "Создание Единой цифровой модели",
        "Продажные Визуализации ЖК и Генпланы территорий",
        "Полнометражный FullCGI и AI Видеопродакшн",
      ],
    },
    audience: ["Отдел маркетинга", "Отдел продаж", "Агенты"],
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    // TODO: тестовая ссылка на UE5 pixel-streaming, замените на боевую
    streamUrl: STREAM_URL,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Единая цифровая модель для всего контента",
        description: "Описание",
        icon: FileBox,
      },
      {
        title: "Высококачественные Визуализации и Генпланы территорий",
        description: "Описание",
        icon: Fence,
      },
      {
        title: "Презентационный полнометражный видеофильм FullCGI, AI-Видео",
        description: "Описание",
        icon: Film,
      },
      {
        title: "АГР модель по новым требованиям",
        description: "Описание",
        icon: Rows3,
      },
    ],
  },
];
