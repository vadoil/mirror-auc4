import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BeneficiariesSection from "@/components/BeneficiariesSection";
import LotsPreviewSection from "@/components/LotsPreviewSection";
import VenuePreviewSection from "@/components/VenuePreviewSection";
import TransparencySection from "@/components/TransparencySection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full relative">
      <Header />
      <HeroSection />
      <div className="relative z-10">
        <AboutSection />
        <BeneficiariesSection />
        <LotsPreviewSection />
        <VenuePreviewSection />
        <TransparencySection />
        <ContactsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
