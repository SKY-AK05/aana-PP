import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
