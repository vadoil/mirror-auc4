import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import RelevanceSection from "@/components/RelevanceSection";
import TopicsSection from "@/components/TopicsSection";
import SpeakersSection from "@/components/SpeakersSection";
import ProgramSection from "@/components/ProgramSection";
import VideoSection from "@/components/VideoSection";
import FormatSection from "@/components/FormatSection";
import QuizSection from "@/components/QuizSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import OrganizersSection from "@/components/OrganizersSection";
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
      <QuizSection />
      <StatsSection />
      <RelevanceSection />
      <TopicsSection />
      <SpeakersSection />
      <ProgramSection />
      <VideoSection />
      <FormatSection />
      <TestimonialsSection />
      <OrganizersSection />
      <PartnersSection />
      <TicketsSection />
      <ContactsSection />
      <Footer />
    </div>
  );
};

export default Index;
