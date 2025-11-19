import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  bio?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - in real app, this would call your backend
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser) {
      // In real app, verify password with backend
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call - in real app, this would call your backend
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (users.some((u: User) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      joinedDate: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Also update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u: User) => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};



