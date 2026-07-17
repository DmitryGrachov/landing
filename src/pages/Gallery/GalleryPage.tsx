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
import { featureImages, worksGrid1, worksGrid2, worksGrid3, type TabId } from "./data";

export default function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("archiviz");

  return (
    <LightboxProvider>
      <div className="min-h-screen bg-white font-sans">
        <Header onMenuOpen={() => setMenuOpen(true)} />
        <FloatingTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        <Menu open={menuOpen} onClose={() => setMenuOpen(false)} onTabChange={setActiveTab} />
        <main>
          <Hero activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "archiviz" && (
            <>
              <section id="capabilities" className="scroll-mt-[90px] bg-white">
                <GalleryGrid images={featureImages} />
              </section>
              <section id="works" className="scroll-mt-[90px] bg-white">
                <GalleryGrid images={worksGrid1} />
                <GalleryGrid images={worksGrid2} />
                <GalleryGrid images={worksGrid3} />
              </section>
              <Showcase />
            </>
          )}

          {activeTab === "video" && <PlaceholderSection id="video" label="Видео" icon={Video} />}

          {activeTab === "software" && (
            <PlaceholderSection id="software" label="ПО/UE" icon={LayoutTemplate} />
          )}

          <Quote />
          <ContactSection />
        </main>
      </div>
    </LightboxProvider>
  );
}
