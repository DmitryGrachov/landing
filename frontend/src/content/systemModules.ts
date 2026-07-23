import type { LucideIcon } from "lucide-react";
import { Building2, Sofa, Square, DoorOpen, Trees, Search, Calculator, TabletSmartphone, Blocks, Sun } from "lucide-react";
import { DEMO_VIDEO_URL } from "../lib/rutube";

export type FeatureCard = {
  title: string;
  description: string;
  image?: string;
  icon: LucideIcon;
};

export type SystemModule = {
  /** Уникальный id секции (используется как #anchor и React key) */
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Короткие теги "кому подходит модуль", показываются над кнопкой */
  audience?: string[];
  buttonLabel?: string;
  /** Видео, показанное встроенным на старте (в блоке SystemPreview) */
  previewVideoUrl?: string;
  /** Картинка-заглушка, если previewVideoUrl не задан */
  previewImage?: string;
  /** Видео, которое откроется в модалке — если не задано, берётся previewVideoUrl */
  modalVideoUrl?: string;
  featuresHeading: string;
  features: FeatureCard[];
};

export const systemModules: SystemModule[] = [
  {
    id: "1",
    eyebrow: "О системе",
    title: "Интерактивный макет UE5",
    description:
      "TODO: описание блока 2",
    audience: ["Отдел продаж", "Горячие лиды", "Агенты"],
    previewVideoUrl: DEMO_VIDEO_URL,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Обзор жилого комплекса",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Прогулка по Благоустройству",
        description: "Описание",
        icon: Trees,
      },
      {
        title: "Тур по Интерьерам квартир",
        description: "Описание",
        icon: Sofa,
      },
      {
        title: "Реальный вид из окна",
        description: "Описание",
        icon: DoorOpen,
      },
      {
        title: "3D Планы этажей",
        description: "Описание",
        icon: Square,
      },
      {
        title: "Движение солнца и теней ",
        description: "Описание",
        icon: Sun,
      },
      {
        title: "Поиск недвижимости",
        description: "Описание",
        icon: Search,
      },
      {
        title: "Кредитный калькулятор",
        description: "Описание",
        icon: Calculator,
      },
      {
        title: "Интеграция с CRM",
        description: "Описание",
        icon: Blocks,
      },
      {
        title: "Доступность на ПК и WEB",
        description: "Описание",
        icon: TabletSmartphone,
      },
    ],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "2",
    eyebrow: "О системе",
    title: "Интерактивный макет WEB",
    description: "TODO: описание блока 2",
    audience: ["Отдел продаж", "Холодные лиды", "Горячие лиды", "Агенты"],
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Обзор жилого комплекса",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Прогулка по Благоустройству",
        description: "Описание",
        icon: Trees,
      },
      {
        title: "Тур по Интерьерам квартир",
        description: "Описание",
        icon: Sofa,
      },
      {
        title: "Реальный вид из окна",
        description: "Описание",
        icon: DoorOpen,
      },
      {
        title: "Планы этажей",
        description: "Описание",
        icon: Square,
      },
      {
        title: "Поиск недвижимости",
        description: "Описаниея",
        icon: Search,
      },
      {
        title: "Кредитный калькулятор",
        description: "Описание",
        icon: Calculator,
      },
      {
        title: "Интеграция с CRM",
        description: "Описание",
        icon: Blocks,
      },
      {
        title: "Доступность на Смартфонах, Планшетах и ПК",
        description: "Описание",
        icon: TabletSmartphone,
      },
    ],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "3",
    eyebrow: "О системе",
    title: "Единая цифровая Экосистема",
    description: "TODO: описание блока 3",
    audience: ["Отдел продаж", "Агенты"],
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Личный кабинет покупателя",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Сохранение избранного",
        description: "Описание",
        icon: Building2,
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
        title: "Срокинг",
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
    title: "Удаленный офис продаж",
    description: "TODO: описание блока 4",
    audience: ["Отдел продаж", "Агенты"],
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Pixel Streaming UE5 - 1 канал = 1 переговорная",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Бронирование конференции",
        description: "Описание",
        icon: Building2,
      },
      {
        title: "Увеличение количества сессий, если поток возрос",
        description: "Описание",
        icon: Building2,
      },
    ],
  },
];
