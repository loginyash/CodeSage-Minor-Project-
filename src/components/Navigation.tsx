import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu, X, Flame, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/paths", label: "Learning Paths" },
  { path: "/analytics", label: "Analytics" },
  { path: "/community", label: "Community" },
];

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, filter: "blur(8px)" }}
      animate={{ y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 ${
        isScrolled ? "pt-4" : "pt-6"
      }`}
    >
      <div 
        className={`mx-auto container max-w-5xl rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between px-4 sm:px-6 py-3 transition-all duration-500 ${
          isScrolled ? "bg-black/60 shadow-[0_8px_32px_rgba(0,240,255,0.08)] border-white/20" : ""
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="bg-primary/10 p-1.5 rounded-full border border-primary/20"
          >
            <Code className="h-5 w-5 text-primary" />
          </motion.div>
          <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent group-hover:opacity-80 transition-opacity hidden sm:block">
            CodeSage
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                  active ? "text-primary" : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                title="3 Day Streak!"
              >
                <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
                <span>3</span>
              </motion.div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-white/10 ring-2 ring-transparent hover:ring-primary/50 transition-all p-0">
                    <div className="h-full w-full rounded-full bg-gradient-to-tr from-primary to-purple-400 p-[2px]">
                      <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-panel border-white/10 mt-2 rounded-xl" align="end">
                  <DropdownMenuLabel className="font-mono text-xs text-primary uppercase tracking-wider">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer focus:bg-white/10 rounded-lg focus:text-primary transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10 rounded-lg transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-white/10 text-gray-300 hover:text-white rounded-full px-5 text-sm font-medium">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider text-xs px-6 py-2 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
            className="md:hidden absolute top-[80px] left-4 right-4 glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#090b14]/95 backdrop-blur-3xl"
          >
            <nav className="flex flex-col p-3 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-semibold p-4 rounded-xl transition-all flex items-center ${
                      active ? "bg-primary/10 text-primary border border-primary/20" : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              
              <div className="h-px bg-white/10 my-3" />
              
              {user ? (
                <>
                  <div className="flex items-center gap-2 p-4 text-orange-500 font-bold text-sm bg-orange-500/5 rounded-xl border border-orange-500/10 mb-2">
                    <Flame className="h-4 w-4 fill-current animate-pulse" />
                    <span>3 Day Streak! Keep it up!</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl w-full p-6 text-md font-semibold"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Log out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 p-1">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center rounded-xl p-6 text-gray-300 hover:text-white hover:bg-white/5 font-semibold text-md">Log in</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded-xl font-bold uppercase tracking-wider p-6 text-md">Get Started</Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
