import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm"
                >
                    <div className="glass-panel p-4 rounded-xl border-l-4 border-l-yellow-400 shadow-2xl flex items-start gap-3">
                        <div className="p-2 bg-yellow-400/10 rounded-full text-yellow-400 shrink-0">
                            <Lightbulb className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1 text-yellow-400">Daily Wisdom</h4>
                            <p className="text-sm text-muted-foreground">{tip}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mt-1 -mr-1 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsVisible(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DailyTip;
