import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import VideoTutorialsSection from "@/components/VideoTutorialsSection";
import EncouragementSection from "@/components/EncouragementSection";
import DailyTip from "@/components/DailyTip";
import CodeSageBot from "@/components/CodeSageBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <DailyTip />
      <CodeSageBot />
      <HeroSection />
      <LearningPaths />
      <VideoTutorialsSection />
      <EncouragementSection />
    </div>
  );
};

export default Index;
