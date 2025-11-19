import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import VideoTutorialsSection from "@/components/VideoTutorialsSection";
import EncouragementSection from "@/components/EncouragementSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <LearningPaths />
      <VideoTutorialsSection />
      <EncouragementSection />
    </div>
  );
};

export default Index;
