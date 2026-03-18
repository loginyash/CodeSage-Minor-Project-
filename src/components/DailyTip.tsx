import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X, ChevronRight, ChevronLeft } from "lucide-react";

const tips = [
    { emoji: "🧩", text: "Break complex problems into smaller, manageable steps." },
    { emoji: "📅", text: "Consistent practice beats cramming. Code a little every day!" },
    { emoji: "💥", text: "Don't be afraid to break things. That's how you learn how they work." },
    { emoji: "📖", text: "Read other people's code to discover new patterns and techniques." },
    { emoji: "💬", text: "Comments explain 'why', not 'what'. Good code documents itself." },
    { emoji: "☕", text: "Take breaks! Your brain solves problems while you're away from the screen." },
    { emoji: "🔍", text: "Master the debugger. It's a genuine superpower." },
    { emoji: "🌿", text: "Use Git and commit often — it's your safety net and time machine." },
    { emoji: "🧪", text: "Write tests. They're proof your code actually does what you think it does." },
    { emoji: "🚀", text: "Ship something small and imperfect rather than waiting for perfect." },
];

const DailyTip = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [index, setIndex] = useState(() => Math.floor(Math.random() * tips.length));
    const [direction, setDirection] = useState(1);

    // auto-cycle every 12 s while visible
    useEffect(() => {
        if (!isVisible) return;
        const id = setInterval(() => {
            setDirection(1);
            setIndex((i) => (i + 1) % tips.length);
        }, 12000);
        return () => clearInterval(id);
    }, [isVisible]);

    const navigate = (dir: number) => {
        setDirection(dir);
        setIndex((i) => (i + dir + tips.length) % tips.length);
    };

    if (!isVisible) return null;

    const tip = tips[index];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 60, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 60, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    /* bottom-right, above the chatbot button (mb-24) */
                    className="fixed bottom-6 left-6 z-40 w-72 sm:w-80"
                >
                    <div
                        className="relative rounded-2xl overflow-hidden border border-border shadow-2xl"
                        style={{ background: "hsl(var(--card))", backdropFilter: "blur(16px)" }}
                    >
                        {/* top accent bar */}
                        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6)" }} />

                        <div className="p-4">
                            {/* header row */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))" }}>
                                        <Lightbulb className="w-4 h-4 text-violet-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                                        Daily Wisdom
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-muted-foreground">{index + 1}/{tips.length}</span>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="ml-1 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
                                        aria-label="Dismiss"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* tip body with slide animation */}
                            <div className="relative h-14 overflow-hidden">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={index}
                                        custom={direction}
                                        initial={{ x: direction * 40, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: direction * -40, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="absolute inset-0 flex items-center gap-2.5"
                                    >
                                        <span className="text-2xl shrink-0">{tip.emoji}</span>
                                        <p className="text-sm text-foreground/80 leading-snug">{tip.text}</p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* progress dots + nav */}
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex gap-1">
                                    {tips.map((_, i) => (
                                        <button key={i} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                                            className="rounded-full transition-all duration-300"
                                            style={{
                                                width: i === index ? "16px" : "6px",
                                                height: "6px",
                                                background: i === index
                                                    ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                                                    : "hsl(var(--muted-foreground) / 0.3)",
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => navigate(-1)}
                                        className="w-6 h-6 rounded-full flex items-center justify-center border border-border hover:bg-muted transition-colors">
                                        <ChevronLeft className="w-3 h-3" />
                                    </button>
                                    <button onClick={() => navigate(1)}
                                        className="w-6 h-6 rounded-full flex items-center justify-center border border-border hover:bg-muted transition-colors">
                                        <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DailyTip;
