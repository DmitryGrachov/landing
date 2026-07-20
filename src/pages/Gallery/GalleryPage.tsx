import { useState } from "react";
import { Video, LayoutTemplate } from "lucide-react";
import LightboxProvider from "./components/Lightbox/LightboxProvider";
import Header from "./components/Header/Header";
import FloatingTabBar from "./components/FloatingTabBar/FloatingTabBar";
import Menu from "./components/Menu/Menu";
import Hero from "./components/Hero/Hero";
import GalleryGrid from "./components/GalleryGrid/GalleryGrid";
import Showcase from "./components/Showcase/Showcase";
import Quote from "./components/Quote/Quote";
import PlaceholderSection from "./components/PlaceholderSection/PlaceholderSection";
import ContactSection from "./components/ContactSection/ContactSection";
import { useGalleryData } from "./hooks/useGalleryData";
import type { TabId } from "./types";

export default function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("archiviz");
  const galleryData = useGalleryData();

  if (galleryData.status === "loading") {
    return <div className="min-h-screen bg-white" />;
  }

  if (galleryData.status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <p className="text-[14px] text-black/60">
          Не удалось загрузить данные страницы: {galleryData.error}
        </p>
      </div>
    );
  }

  const { data } = galleryData;

  return (
    <LightboxProvider>
      <div className="min-h-screen bg-white font-sans">
        <Header logo={data.header.logo} phone={data.header.phone} onMenuOpen={() => setMenuOpen(true)} />
        <FloatingTabBar tabs={data.tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onTabChange={setActiveTab}
          logo={data.menu.logo}
          links={data.menu.links}
          socials={data.menu.socials}
          phone={data.contactPhone}
        />
        <main>
          <Hero tabs={data.tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "archiviz" && (
            <>
              <section id="capabilities" className="scroll-mt-[90px] bg-white">
                <GalleryGrid images={data.gallery.feature} />
              </section>
              <section id="works" className="scroll-mt-[90px] bg-white">
                <GalleryGrid images={data.gallery.works} />
              </section>
              <Showcase images={data.gallery.showcase} />
            </>
          )}

          {activeTab === "video" && <PlaceholderSection id="video" label="Видео" icon={Video} />}

          {activeTab === "software" && (
            <PlaceholderSection id="software" label="ПО/UE" icon={LayoutTemplate} />
          )}

          <Quote text={data.quote} />
          <ContactSection phone={data.contactPhone} socials={data.menu.socials} />
        </main>
      </div>
    </LightboxProvider>
  );
}
