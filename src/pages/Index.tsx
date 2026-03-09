import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RelevanceSection from "@/components/RelevanceSection";
import TopicsSection from "@/components/TopicsSection";
import SpeakersSection from "@/components/SpeakersSection";
import ProgramSection from "@/components/ProgramSection";
import FormatSection from "@/components/FormatSection";
import PartnersSection from "@/components/PartnersSection";
import TicketsSection from "@/components/TicketsSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <RelevanceSection />
      <TopicsSection />
      <SpeakersSection />
      <ProgramSection />
      <FormatSection />
      <PartnersSection />
      <TicketsSection />
      <ContactsSection />
      <Footer />
    </div>
  );
};

export default Index;
