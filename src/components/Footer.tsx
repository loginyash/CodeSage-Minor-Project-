import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-8 bg-background border-t border-border">
            <div className="container mx-auto px-4 text-center">
                <p className="flex items-center justify-center gap-2 text-muted-foreground">
                    Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the Code Sage Team
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    Major Project 2025 • Computer Science Department
                </p>
            </div>
        </footer>
    );
};

export default Footer;
