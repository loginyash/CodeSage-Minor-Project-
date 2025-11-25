import Navigation from "@/components/Navigation";
import LearningPathsComponent from "@/components/LearningPaths";
import { motion } from "framer-motion";

const LearningPaths = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <main className="pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-4"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
                            Learning Paths
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Structured roadmaps to guide you from beginner to expert. Choose your path and start your journey today.
                        </p>
                    </div>

                    <LearningPathsComponent />
                </motion.div>
            </main>
        </div>
    );
};

export default LearningPaths;
