import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
            <line key={i}
                x1={12 + 6.5 * Math.cos((deg * Math.PI) / 180)}
                y1={12 + 6.5 * Math.sin((deg * Math.PI) / 180)}
                x2={12 + 9.5 * Math.cos((deg * Math.PI) / 180)}
                y2={12 + 9.5 * Math.sin((deg * Math.PI) / 180)}
            />
        ))}
    </svg>
);

const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
);

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="relative flex items-center justify-between w-[60px] h-[30px] rounded-full border px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden"
            style={{
                background: isDark
                    ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
                    : "linear-gradient(135deg, #fde68a 0%, #fb923c 100%)",
                borderColor: isDark ? "rgba(99,102,241,0.4)" : "rgba(251,146,60,0.5)",
                boxShadow: isDark
                    ? "0 0 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 0 12px rgba(251,191,36,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
        >
            {/* Stars (dark) / Clouds (light) background decoration */}
            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.span key="stars"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-end pr-[26px] pointer-events-none"
                    >
                        <span className="text-[7px] text-white/60 flex flex-col gap-[1px] leading-none">
                            <span>·  ·</span>
                            <span>  ·</span>
                        </span>
                    </motion.span>
                ) : (
                    <motion.span key="clouds"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center pl-[4px] pointer-events-none"
                    >
                        <span className="text-[8px] text-white/70">☁</span>
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Sliding orb */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="relative z-10 w-[22px] h-[22px] rounded-full flex items-center justify-center shadow-md"
                style={{
                    marginLeft: isDark ? "0px" : "auto",
                    marginRight: isDark ? "auto" : "0px",
                    background: isDark
                        ? "linear-gradient(135deg, #c7d2fe, #818cf8)"
                        : "linear-gradient(135deg, #fef08a, #fbbf24)",
                    boxShadow: isDark
                        ? "0 0 8px rgba(129,140,248,0.8)"
                        : "0 0 12px rgba(251,191,36,0.9)",
                    color: isDark ? "#312e81" : "#92400e",
                }}
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.span key="moon"
                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center"
                            style={{ width: 13, height: 13 }}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
                            </svg>
                        </motion.span>
                    ) : (
                        <motion.span key="sun"
                            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center"
                            style={{ width: 13, height: 13 }}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                                <circle cx="12" cy="12" r="5"/>
                                {[0,60,120,180,240,300].map((deg, i) => (
                                    <line key={i} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                        x1={12 + 7.5 * Math.cos((deg * Math.PI) / 180)}
                                        y1={12 + 7.5 * Math.sin((deg * Math.PI) / 180)}
                                        x2={12 + 10 * Math.cos((deg * Math.PI) / 180)}
                                        y2={12 + 10 * Math.sin((deg * Math.PI) / 180)}
                                    />
                                ))}
                            </svg>
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.button>
    );
};

export { SunIcon, MoonIcon };
export default ThemeToggle;
