import { HeroSection } from "@/components/hero-section";
import { EnhancedAboutSection } from "@/components/EnhancedAboutSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import MyWorkSection from "@/components/MyWorkSection";
import ClientsSection from "@/components/ClientsSection";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <HeroSection />
        <EnhancedAboutSection />
        <WhatIDoSection />
        <MyWorkSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
