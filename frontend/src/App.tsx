import { useEffect } from "react";
import { ContactModalProvider } from "./components/ContactModal";
import { VideoModalProvider } from "./components/VideoModal";
import { DEMO_VIDEO_URL } from "./lib/rutube";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import SystemPreview from "./sections/SystemPreview";
import Features from "./sections/Features";
import Pipeline from "./sections/Pipeline";
import Comparison from "./sections/Comparison";
import Audiences from "./sections/Audiences";
import Impact from "./sections/Impact";
import RoiCalculator from "./sections/RoiCalculator";
import Implementation from "./sections/Implementation";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <ContactModalProvider>
      <VideoModalProvider>
        <div className="relative min-h-screen bg-canvas">
          <Nav />
          <main>
            <Hero />
            <SystemPreview rutubeUrl={DEMO_VIDEO_URL} />
            <Features />
            <Pipeline />
            <Comparison />
            <Audiences />
            <Impact />
            <RoiCalculator />
            <Implementation />
            <FAQ />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      </VideoModalProvider>
    </ContactModalProvider>
  );
}

export default App;
