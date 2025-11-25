
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
import { User, LogOut, Menu, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top - 0 left - 0 right - 0 z - 50 transition - all duration - 300 ${isScrolled ? "glass-panel border-b-0 rounded-none py-2" : "bg-transparent py-4"
        } `}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="bg-gradient-to-br from-primary to-purple-600 text-white p-2 rounded-xl shadow-lg shadow-primary/20"
          >
            <span className="font-bold text-xl">CS</span>
          </motion.div>
          <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">CodeSage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text - sm font - medium transition - colors hover: text - primary ${isActive("/") ? "text-primary" : "text-muted-foreground"
              } `}
          >
            Home
          </Link>
          <Link
            to="/paths"
            className={`text - sm font - medium transition - colors hover: text - primary ${isActive("/paths") ? "text-primary" : "text-muted-foreground"
              } `}
          >
            Learning Paths
          </Link>
          <Link
            to="/community"
            className={`text - sm font - medium transition - colors hover: text - primary ${isActive("/community") ? "text-primary" : "text-muted-foreground"
              } `}
          >
            Community
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium"
                title="3 Day Streak!"
              >
                <Flame className="h-4 w-4 fill-current animate-pulse" />
                <span>3</span>
              </motion.div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                    <div className="h-full w-full rounded-full bg-gradient-to-tr from-primary to-purple-400 p-[2px]">
                      <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-panel border-white/10" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer focus:bg-white/10">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-white/5">Log in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 shadow-glow">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10"
          >
            <nav className="flex flex-col p-4 gap-4">
              <Link
                to="/"
                className="text-sm font-medium p-2 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/paths"
                className="text-sm font-medium p-2 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Learning Paths
              </Link>
              <Link
                to="/community"
                className="text-sm font-medium p-2 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-2 p-2 text-orange-500 font-medium">
                    <Flame className="h-4 w-4 fill-current" />
                    <span>3 Day Streak!</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-400 hover:text-red-400 hover:bg-red-400/10"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Log in</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary shadow-glow">Get Started</Button>
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
