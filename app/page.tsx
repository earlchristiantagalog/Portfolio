import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { SkillTicker } from "./components/home/SkillTicker";
import { SkillsSection } from "./components/home/SkillsSection";
import { TelemetrySection } from "./components/home/TelemetrySection";
import { FeaturedWork } from "./components/home/FeaturedWork";
import { CtaSection } from "./components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <SkillTicker />
        <SkillsSection />
        <TelemetrySection />
        <FeaturedWork />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
