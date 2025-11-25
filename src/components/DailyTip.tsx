import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

const tips = [
    "💡 Tip: Break complex problems into smaller, manageable steps.",
    "💡 Tip: Consistent practice beats cramming. Code a little every day!",
    "💡 Tip: Don't be afraid to break things. That's how you learn how they work.",
    "💡 Tip: Read other people's code to learn new patterns and techniques.",
    "💡 Tip: Comments are for 'why', not 'what'. Good code explains itself.",
    "💡 Tip: Take breaks! Your brain solves problems while you're away from the screen.",
    "💡 Tip: Learn to use the debugger. It's a superpower.",
    "💡 Tip: Version control (Git) is your safety net. Commit often!",
];

const DailyTip = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [tip, setTip] = useState("");

    useEffect(() => {
        // Pick a random tip on mount
        setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    className="fixed bottom-6 left-6 z-40 max-w-sm"
                >
                    <div className="glass-panel p-4 rounded-xl border-l-4 border-primary shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start gap-3 relative z-10">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <Lightbulb className="w-5 h-5 text-primary animate-pulse" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                                    Daily Wisdom
                                    <span className="text-[10px] bg-primary/20 px-1.5 py-0.5 rounded text-primary-foreground">
                                        Tip #{Math.floor(Math.random() * 100)}
                                    </span>
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {tip}
                                </p>
                            </div>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DailyTip;
