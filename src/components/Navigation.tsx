import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Code, User, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b shadow-card">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Code className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
            CodeSage
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`transition-colors ${
              isActive("/") ? "text-primary font-semibold" : "text-foreground hover:text-primary"
            }`}
          >
            Lessons
          </Link>
          <Link
            to="/progress"
            className={`transition-colors ${
              isActive("/progress") ? "text-primary font-semibold" : "text-foreground hover:text-primary"
            }`}
          >
            Progress
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/progress" className="cursor-pointer">
                    Progress
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;