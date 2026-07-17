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
import { featureImages, worksGrid1, worksGrid2, worksGrid3 } from "./data";

export default function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <LightboxProvider>
      <div className="min-h-screen bg-white font-sans">
        <Header onMenuOpen={() => setMenuOpen(true)} />
        <FloatingTabBar />
        <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main>
          <Hero />
          <section id="capabilities" className="scroll-mt-[90px] bg-white px-6 min-[480px]:px-10">
            <GalleryGrid images={featureImages} />
          </section>
          <section id="works" className="scroll-mt-[90px] bg-white px-6 min-[480px]:px-10">
            <GalleryGrid images={worksGrid1} />
            <GalleryGrid images={worksGrid2} />
            <GalleryGrid images={worksGrid3} />
          </section>
          <Showcase />
          <Quote />
          <PlaceholderSection id="video" label="Видео" icon={Video} />
          <PlaceholderSection id="software" label="ПО/UE" icon={LayoutTemplate} />
          <ContactSection />
        </main>
      </div>
    </LightboxProvider>
  );
}
