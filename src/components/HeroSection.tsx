import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Users } from "lucide-react";
import heroImage from "@/assets/hero-coding.jpg";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit">
              🎉 Welcome to your coding journey!
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Learn to <span className="gradient-hero bg-clip-text text-transparent">Code</span> with{" "}
                <span className="gradient-secondary bg-clip-text text-transparent">Confidence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Hi there, future developer! 👋 I'm CodeSage, your friendly coding mentor. 
                Let's make learning to code fun, encouraging, and totally achievable - one step at a time!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="#lessons">
                <Button size="lg" variant="hero" className="gap-2">
                  <Play className="h-5 w-5" />
                  Start Learning Today
                </Button>
              </Link>
              <Link to="/progress">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  View Progress
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-secondary" />
                <span>50,000+ happy learners</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span>4.9/5 student rating</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 gradient-hero rounded-3xl blur-3xl opacity-20"></div>
            <img
              src={heroImage}
              alt="Students learning to code together"
              className="relative rounded-3xl shadow-card w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;