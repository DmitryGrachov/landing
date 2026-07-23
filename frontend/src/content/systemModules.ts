import type { LucideIcon } from "lucide-react";
import { Building2, Sofa, DoorOpen, Trees, Sun, LayoutGrid } from "lucide-react";
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
    id: "demo",
    eyebrow: "О системе",
    title: "Интерактивный макет UE5",
    description:
      "За пару минут покажем, как визуализация, сайт проекта, выбор квартир, UE5-тур и CRM работают как единое целое — от первого касания клиента до сделки.",
    previewVideoUrl: DEMO_VIDEO_URL,
    featuresHeading: "Что входит в проект?",
    features: [
      {
        title: "Обзор ЖК",
        description: "Обзор жилого комплекса и его окружения",
        icon: Building2,
      },
      {
        title: "Исследование интерьера",
        description: "Прогулка по будущей квартире покупателя от 1-го лица",
        icon: Sofa,
      },
      {
        title: "Обзор зон благоустройства",
        description: "Отображение мест общего пользования: зелёные зоны, детские и спортивные площадки",
        icon: Trees,
      },
      {
        title: "Реальный вид из окна",
        description: "Демонстрация реального вида из окна будущей квартиры покупателя",
        icon: DoorOpen,
      },
      {
        title: "Смена времени суток",
        description: "Переключение освещения дня и ночи для оценки атмосферы проекта",
        icon: Sun,
      },
      {
        title: "Расстановка мебели",
        description: "Визуализация вариантов меблировки и планировочных решений",
        icon: LayoutGrid,
      },
    ],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "demo-2",
    eyebrow: "О системе",
    title: "TODO: заголовок блока 2",
    description: "TODO: описание блока 2",
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    featuresHeading: "TODO: заголовок карточек блока 2",
    features: [],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "demo-3",
    eyebrow: "О системе",
    title: "TODO: заголовок блока 3",
    description: "TODO: описание блока 3",
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    featuresHeading: "TODO: заголовок карточек блока 3",
    features: [],
  },
  {
    // TODO: заменить на реальные тексты/видео/карточки
    id: "demo-4",
    eyebrow: "О системе",
    title: "TODO: заголовок блока 4",
    description: "TODO: описание блока 4",
    previewVideoUrl: undefined,
    modalVideoUrl: undefined,
    featuresHeading: "TODO: заголовок карточек блока 4",
    features: [],
  },
];
