import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import WhatIDoSection from "@/components/WhatIDoSection";
import MyWorkSection from "@/components/MyWorkSection";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MyWorkSection />
        <WhatIDoSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
