import Container from "@/components/ui/Container";

import HeroBackground from "./HeroBackground";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <Container className="relative z-10">
        <div className="grid min-h-[calc(100vh-80px)] items-center gap-16 py-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <HeroBadge />

            <HeroContent />

            <HeroButtons />

            <HeroStats />
          </div>

          <div className="order-1 lg:order-2">
            <HeroImage />
          </div>
        </div>
      </Container>
    </section>
  );
}