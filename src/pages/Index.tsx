import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import VideoTutorialsSection from "@/components/VideoTutorialsSection";
import EncouragementSection from "@/components/EncouragementSection";

import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <HeroSection />
      <LearningPaths />
      <VideoTutorialsSection />
      <EncouragementSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Index;
