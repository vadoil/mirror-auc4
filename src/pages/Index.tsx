import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectStorySection from "@/components/ProjectStorySection";
import BeneficiariesSection from "@/components/BeneficiariesSection";
import LotsPreviewSection from "@/components/LotsPreviewSection";
import AuctioneerSection from "@/components/AuctioneerSection";
import VenuePreviewSection from "@/components/VenuePreviewSection";
import TransparencySection from "@/components/TransparencySection";
import ForumBannerSection from "@/components/ForumBannerSection";

import ForumBannerFooter from "@/components/ForumBannerFooter";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full relative">
      <Header />
      <HeroSection />
      <div className="relative z-10">
        <AboutSection />
        <ProjectStorySection />
        <BeneficiariesSection />
        <LotsPreviewSection />
        <AuctioneerSection />
        <VenuePreviewSection />
        <TransparencySection />
        <ForumBannerSection />
        <OrganizersSection />
        <ContactsSection />
        <ForumBannerFooter />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
