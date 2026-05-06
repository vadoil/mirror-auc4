import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

import ProjectStorySection from "@/components/ProjectStorySection";
import BeneficiariesSection from "@/components/BeneficiariesSection";
import LotsPreviewSection from "@/components/LotsPreviewSection";
import AuctionResultsSection from "@/components/AuctionResultsSection";
import PrizesSection from "@/components/PrizesSection";
import AuctioneerSection from "@/components/AuctioneerSection";
import VenuePreviewSection from "@/components/VenuePreviewSection";
import TransparencySection from "@/components/TransparencySection";
import TicketsSection from "@/components/TicketsSection";
import ForumBannerSection from "@/components/ForumBannerSection";
import OrganizersSection from "@/components/OrganizersSection";

import SponsorsSection from "@/components/SponsorsSection";
import DressCodeSection from "@/components/DressCodeSection";
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
        <AuctionResultsSection />
        <PrizesSection />
        <BeneficiariesSection />
        <LotsPreviewSection />
        <AuctioneerSection />
        <VenuePreviewSection />
        <DressCodeSection />
        <MasterclassSection />
        <TransparencySection />
        <TicketsSection />
        <ForumBannerSection />
        <SponsorsSection />
        <ContactsSection />
        <OrganizersSection />
        <ForumBannerFooter />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
