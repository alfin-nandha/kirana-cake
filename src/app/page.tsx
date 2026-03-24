import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import NewsSection from "@/components/NewsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

export default async function Home() {
  const config = await prisma.storeConfig.findUnique({
    where: { id: 1 },
  });

  if (!config) return null;

  return (
    <main>
      <Navbar />
      {config.showHero && <HeroSection />}
      {config.showStats && <StatsSection />}
      {config.showProducts && <ProductsSection />}
      {config.showNews && <NewsSection />}
      {config.showAbout && <AboutSection />}
      {config.showReviews && <ReviewsSection />}
      {config.showContact && <ContactSection />}
      <Footer />
    </main>
  );
}
