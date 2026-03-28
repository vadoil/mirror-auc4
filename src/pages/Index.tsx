import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ThemesSection from "@/components/ThemesSection";
import WhySection from "@/components/WhySection";
import StatsSection from "@/components/StatsSection";
import ProgramSection from "@/components/ProgramSection";

import FormatSection from "@/components/FormatSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import LotsPreviewSection from "@/components/LotsPreviewSection";
import AuctioneerSection from "@/components/AuctioneerSection";
import VideoSection from "@/components/VideoSection";
import VenueSection from "@/components/VenueSection";
import TicketsSection from "@/components/TicketsSection";
import VipGiftSection from "@/components/VipGiftSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import OrganizersSection from "@/components/OrganizersSection";
import FAQSection from "@/components/FAQSection";
import ContactsSection from "@/components/ContactsSection";
import ForumBannerSection from "@/components/ForumBannerSection";
import ForumBannerFooter from "@/components/ForumBannerFooter";
import QuizSection from "@/components/QuizSection";
import Footer from "@/components/Footer";

// Force refresh
const Index = () => {
  return (
    <div className="min-h-screen w-full relative">
      <Header />
      <HeroSection />
      <div className="relative z-10">
      <AboutSection />
      <ThemesSection />
      <WhySection />
      <StatsSection />
      <ProgramSection />
      
      <FormatSection />
      <HowItWorksSection />
      <LotsPreviewSection />
      <AuctioneerSection />
      <VideoSection />
      <VenueSection />
      <TicketsSection />
      <VipGiftSection />
      <TestimonialsSection />
      <PartnersSection />
      <OrganizersSection />
      <FAQSection />
      <ContactsSection />
      <ForumBannerSection />
      <ForumBannerFooter />
      <QuizSection />
      <Footer />
      </div>
    </div>
  );
};

export default Index;
