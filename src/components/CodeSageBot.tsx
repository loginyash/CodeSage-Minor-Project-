import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Code, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

const CodeSageBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hello! I'm Code Sage AI. Ask me anything about coding or this app!",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            const apiUrl = (import.meta.env.VITE_API_URL || "") + "/api/chat";
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputValue }),
            });

            const data = await response.json();

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: data.reply || data.message || "I'm having trouble connecting to my brain right now. Please try again later!",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I couldn't reach the server. Please check your connection.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-80 sm:w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <Code className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Code Sage AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-muted-foreground">Online</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white/10"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user"
                                                ? "bg-secondary text-secondary-foreground"
                                                : "bg-primary text-primary-foreground"
                                                }`}
                                        >
                                            {msg.sender === "user" ? (
                                                <User className="w-4 h-4" />
                                            ) : (
                                                <Code className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div
                                            className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.sender === "user"
                                                ? "bg-secondary text-secondary-foreground rounded-tr-none"
                                                : "bg-muted text-muted-foreground rounded-tl-none"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                            <Code className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-card/50">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about coding..."
                                    className="bg-background/50 border-white/10 focus-visible:ring-primary"
                                />
                                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                                <Sparkles className="w-3 h-3 text-primary" />
                                <span>Powered by Gemini AI</span>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25 flex items-center justify-center text-white border-2 border-white/20"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Code className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};

export default CodeSageBot;
