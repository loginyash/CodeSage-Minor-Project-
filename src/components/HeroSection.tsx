import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-superhero.png";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="w-fit bg-secondary/20 text-secondary-foreground border-secondary/20 backdrop-blur-sm">
                🎉 Welcome to your coding journey!
              </Badge>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Learn to <span className="text-gradient">Code</span> with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">Confidence</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Hi there, future developer! 👋 I'm CodeSage, your friendly coding mentor.
                Let's make learning to code fun, encouraging, and totally achievable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/paths">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-glow transition-all hover:scale-105">
                  <Play className="h-5 w-5" />
                  Start Learning Today
                </Button>
              </Link>
              <Link to="/progress">
                <Button size="lg" variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10 transition-all hover:scale-105">
                  <BookOpen className="h-5 w-5" />
                  View Progress
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>50,000+ happy learners</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                <span>4.9/5 student rating</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-3xl opacity-5" />
            <img
              src={heroImage}
              alt="Code Sage Superhero with < > Crest"
              className="relative w-full max-w-md mx-auto float mix-blend-lighten"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;