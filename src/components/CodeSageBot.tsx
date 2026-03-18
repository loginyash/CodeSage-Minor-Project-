import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Send, X, User, Sparkles, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiClient } from "@/api/apiClient";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

/* ── 3-D Orb Button ─────────────────────────────────────────────── */
const OrbButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-40, 40], [15, -15]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-40, 40], [-15, 15]), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileTap={{ scale: 0.93 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
            className="relative w-16 h-16 rounded-full focus:outline-none group"
            aria-label="Toggle AI Assistant"
        >
            {/* outer glow ring */}
            <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.7) 0%, transparent 70%)" }}
            />
            {/* second slower ring */}
            <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.45, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)" }}
            />
            {/* main sphere */}
            <span
                className="absolute inset-0 rounded-full"
                style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #3b82f6 100%)",
                    boxShadow: "0 0 30px rgba(99,102,241,0.8), inset 0 2px 8px rgba(255,255,255,0.3)",
                }}
            />
            {/* shine */}
            <span
                className="absolute top-2 left-3 w-4 h-3 rounded-full opacity-60"
                style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
            />
            {/* icon */}
            <span className="absolute inset-0 flex items-center justify-center text-white z-10">
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X className="w-6 h-6" />
                        </motion.span>
                    ) : (
                        <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
                            className="flex flex-col items-center gap-0.5">
                            {/* custom brain/AI icon made from circles */}
                            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a4 4 0 0 1 4 3.8 3 3 0 0 1 2 5.2 3 3 0 0 1-1 5.5A4 4 0 0 1 12 20a4 4 0 0 1-5-3.5 3 3 0 0 1-1-5.5 3 3 0 0 1 2-5.2A4 4 0 0 1 12 2z"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <circle cx="12" cy="14" r="1"/>
                            </svg>
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
            {/* hover label */}
            <motion.span
                initial={{ opacity: 0, x: 8 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-popover border border-border text-popover-foreground text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
            >
                Ask Code Sage
            </motion.span>
        </motion.button>
    );
};

/* ── Main Component ──────────────────────────────────────────────── */
const CodeSageBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hey! I'm Code Sage AI 🧠 — your personal coding tutor. Ask me anything!",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: userText,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            const data = await apiClient<{ response?: string; reply?: string; message?: string }>("/api/chat/message", {
                method: "POST",
                body: JSON.stringify({ message: userText }),
            });

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    text: data.response || data.reply || data.message || "I'm having trouble connecting right now. Try again in a moment!",
                    sender: "bot",
                    timestamp: new Date(),
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    text: "⚠️ Couldn't reach the server. Make sure the backend is running.",
                    sender: "bot",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        /* Fixed to viewport bottom-right — always visible regardless of scroll */
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 340, damping: 28 }}
                        className="w-80 sm:w-96 h-[520px] rounded-2xl overflow-hidden flex flex-col border border-border shadow-2xl"
                        style={{ background: "hsl(var(--card))", backdropFilter: "blur(20px)" }}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-border"
                            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)" }}>
                            <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a4 4 0 0 1 4 3.8 3 3 0 0 1 2 5.2 3 3 0 0 1-1 5.5A4 4 0 0 1 12 20a4 4 0 0 1-5-3.5 3 3 0 0 1-1-5.5 3 3 0 0 1 2-5.2A4 4 0 0 1 12 2z"/>
                                        <line x1="12" y1="8" x2="12" y2="12"/>
                                        <circle cx="12" cy="14" r="1"/>
                                    </svg>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Code Sage AI</h3>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                                        Powered by Gemini 2.5
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setIsOpen(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${msg.sender === "user" ? "bg-secondary" : ""}`}
                                            style={msg.sender === "bot" ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)" } : {}}>
                                            {msg.sender === "user"
                                                ? <User className="w-3.5 h-3.5" />
                                                : <Code className="w-3.5 h-3.5" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap ${
                                            msg.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted text-foreground rounded-tl-none"
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex gap-2.5">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white"
                                            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                                            <Code className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                            {[0, 150, 300].map((delay) => (
                                                <motion.span key={delay} className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: delay / 1000 }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card/80">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about coding..."
                                    className="bg-background/60 border-border/60 focus-visible:ring-primary text-sm"
                                    disabled={isTyping}
                                />
                                <Button type="submit" size="icon" disabled={isTyping || !inputValue.trim()}
                                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                                <Sparkles className="w-3 h-3 text-violet-400" />
                                Gemini 2.5 Flash
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating 3D Orb Button */}
            <OrbButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
    );
};

export default CodeSageBot;
