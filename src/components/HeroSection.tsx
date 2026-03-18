import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Users, Terminal } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const HeroSection = () => {
  // 3D Parallax Tracking Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Rotate based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates between -0.5 and 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const codeSnippet = [
    { line: 1, text: "const student = {" },
    { line: 2, text: '  status: "Learning",' },
    { line: 3, text: '  focus: "Web_Development",' },
    { line: 4, text: '  skills: ["React", "Python", "Algorithms"],' },
    { line: 5, text: "  projectsBuilt: 10" },
    { line: 6, text: "};" },
    { line: 7, text: "" },
    { line: 8, text: "await student.startCoding();" }
  ];

  return (
    <section className="pt-24 md:pt-32 pb-16 px-4 md:px-8 overflow-hidden relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,240,255,0.05)_0%,_transparent_50%)] pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="w-fit bg-cyber-dark text-cyber-cyan border-cyber-cyan/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.3)] px-3 py-1 md:px-4 md:py-1 flex items-center gap-2 tracking-widest uppercase text-[10px] md:text-xs font-bold">
                <Terminal className="w-3 h-3" /> Immersive Learning Hub
              </Badge>
            </motion.div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tighter uppercase smooth-hover">
                Master Code <br className="hidden sm:block" />
                <span className="neon-text">
                  The Right Way
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg font-mono mx-auto lg:mx-0">
                {">"} Step into the ultimate learning environment. 
                <br className="hidden sm:block" />
                {">"} Build real projects, master algorithms, and level up your skills.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
              <MagneticWrapper className="w-full sm:w-auto">
                <Link to="/paths" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-cyber-cyan hover:bg-cyber-cyan/80 text-cyber-dark uppercase font-bold tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105 rounded-sm">
                    <Play className="h-5 w-5" />
                    Start Coding
                  </Button>
                </Link>
              </MagneticWrapper>
              <MagneticWrapper className="w-full sm:w-auto">
                <Link to="/progress" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white uppercase font-bold tracking-widest shadow-[0_0_15px_rgba(255,0,60,0.2)] transition-all hover:scale-105 rounded-sm">
                    <BookOpen className="h-5 w-5" />
                    View Curriculum
                  </Button>
                </Link>
              </MagneticWrapper>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cyber-cyan" />
                <span>50,000+ Active Students</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyber-yellow drop-shadow-[0_0_5px_rgba(252,238,10,0.8)]">⭐</span>
                <span>4.9/5 Average Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive 3D CyberDeck Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[500px] flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Glowing Orbs behind the editor */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyber-pink/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-cyber-cyan/20 rounded-full blur-[100px]" />

            <motion.div
              drag
              dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
              dragElastic={0.1}
              style={{ rotateX, rotateY }}
              className="w-full max-w-lg cursor-grab active:cursor-grabbing z-10"
            >
              <div className="cyber-card rounded-md shadow-[0_0_30px_rgba(99,102,241,0.15)] border-t-2 border-t-primary border-b-2 border-b-secondary overflow-hidden bg-card">
                {/* Editor Header */}
                <div className="flex items-center px-4 py-3 bg-muted border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                  </div>
                  <div className="mx-auto flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Terminal className="w-3 h-3" />
                    system_override.ts
                  </div>
                </div>
                
                {/* Editor Body */}
                <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto text-foreground/80">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.8, // delay between lines
                        }
                      }
                    }}
                  >
                    {codeSnippet.map((code, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="flex gap-4 group cursor-text"
                      >
                        <span className="text-primary/40 select-none w-4 text-right">{code.line}</span>
                        <motion.span 
                          className="group-hover:text-white transition-colors"
                          whileHover={{ textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                          // Optional: type-in effect per line
                          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                          transition={{ duration: 0.6, ease: "linear", delay: 1 + index * 0.8 }}
                        >
                          {code.text}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
                    className="flex gap-4 mt-2"
                  >
                    <span className="text-primary/40 select-none w-4 text-right">9</span>
                    <span className="w-2.5 h-5 bg-primary inline-block shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;