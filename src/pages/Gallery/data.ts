export const logoImg = "/gallery/header/logo.png";

export const featureImages = [
  "/gallery/feature/feature-1.webp",
  "/gallery/feature/feature-2.webp",
  "/gallery/feature/feature-3.webp",
  "/gallery/feature/feature-4.webp",
];

export const worksGrid1 = [
  "/gallery/works-1/1.jpg",
  "/gallery/works-1/2.jpg",
  "/gallery/works-1/3.jpg",
  "/gallery/works-1/4.jpg",
  "/gallery/works-1/5.jpg",
  "/gallery/works-1/6.jpg",
  "/gallery/works-1/7.jpg",
  "/gallery/works-1/8.jpg",
];

export const worksGrid2 = [
  "/gallery/works-2/1.png",
  "/gallery/works-2/2.jpg",
  "/gallery/works-2/3.jpg",
  "/gallery/works-2/4.jpg",
  "/gallery/works-2/5.jpg",
  "/gallery/works-2/6.jpg",
  "/gallery/works-2/7.jpg",
  "/gallery/works-2/8.jpg",
];

export const worksGrid3 = [
  "/gallery/works-3/1.jpg",
  "/gallery/works-3/2.jpg",
  "/gallery/works-3/3.jpg",
  "/gallery/works-3/4.jpg",
  "/gallery/works-3/5.jpg",
  "/gallery/works-3/6.jpg",
  "/gallery/works-3/7.jpg",
  "/gallery/works-3/8.jpg",
];

export const showcaseImages = ["/gallery/showcase/1.jpg", "/gallery/showcase/2.jpg"];

export type TabId = "archiviz" | "video" | "software";

export const tabs: { id: TabId; label: string; shortLabel: string }[] = [
  { id: "archiviz", label: "Архивиз.", shortLabel: "Архивиз" },
  { id: "video", label: "Видео.", shortLabel: "Видео" },
  { id: "software", label: "ПО/UE.", shortLabel: "ПО/UE" },
];

export const menuLinks: { label: string; href: string; tab?: TabId }[] = [
  { label: "Главная", href: "#home" },
  { label: "Возможности", href: "#capabilities", tab: "archiviz" },
  { label: "Работы", href: "#works", tab: "archiviz" },
  { label: "Партнеры", href: "#showcase", tab: "archiviz" },
  { label: "Контакты", href: "#contacts" },
];

export const phone = "8-999-555-44-22";
export const headerPhone = "+7-999-888-55-63";
