import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("codesage-theme");
    return (saved as Theme) || "dark";
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("codesage-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    // Trigger overlay animation
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.className = `theme-transition-overlay theme-transition-${nextTheme === "light" ? "light" : "dark"}`;
      overlay.style.display = "block";
    }

    // Switch theme ~halfway through animation
    setTimeout(() => setTheme(nextTheme), 320);

    // Hide overlay after animation completes
    setTimeout(() => {
      if (overlay) overlay.style.display = "none";
      setIsAnimating(false);
    }, 900);
  }, [theme, isAnimating]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Sun rise / set overlay — fixed full-screen, pointer-events-none */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[9999] pointer-events-none"
      />
      {children}
    </ThemeContext.Provider>
  );
};
