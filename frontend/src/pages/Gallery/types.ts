export type TabId = "archiviz" | "video" | "software";

export interface TabDef {
  id: TabId;
  label: string;
  shortLabel: string;
}

export interface MenuLink {
  label: string;
  href: string;
  tab?: TabId;
}

export interface SocialLink {
  label: string;
  icon: string | null;
}

export interface GalleryData {
  header: {
    logo: string;
    phone: string;
  };
  tabs: TabDef[];
  gallery: {
    feature: string[];
    works: string[];
    showcase: string[];
    video: string[];
    software: string[];
  };
  quote: string;
  menu: {
    logo: string;
    links: MenuLink[];
    socials: SocialLink[];
  };
  contactPhone: string;
}
