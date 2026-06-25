import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/features/home/components/hero";
import Features from "@/features/home/components/Features";
import HowItWorks from "@/features/home/components/how-it-works";
import Subjects from "@/features/home/components/subjects";
import Statistics from "@/features/home/components/statistics";
import WhyUs from "@/features/home/components/why-us";
import Testimonials from "@/features/home/components/testimonials";
import FAQ from "@/features/home/components/faq";
import CTA from "@/features/home/components/cta";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Subjects />
        <Statistics />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}