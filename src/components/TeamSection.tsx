import { Github, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const teamMembers = [
    {
        name: "Yashvardhan Acharya",
        initials: "YA",
        role: "Deployment · AI Integration · Firebase",
        bio: "Handles cloud deployment, Firebase authentication, and the Gemini AI integration that powers CodeSage's smart tutor.",
        color: "from-indigo-500 to-violet-600",
        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
        },
    },
    {
        name: "Vinay Bhati",
        initials: "VB",
        role: "Backend Developer",
        bio: "Focused on robust APIs, database design, and server-side logic. Enjoys solving complex engineering problems.",
        color: "from-violet-500 to-purple-600",
        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
        },
    },
    {
        name: "Sandeep Singh",
        initials: "SS",
        role: "Frontend Developer",
        bio: "Crafts responsive, interactive UIs with a sharp eye for detail. Enjoys bringing designs to life with smooth animations.",
        color: "from-blue-500 to-indigo-600",
        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
        },
    },
    {
        name: "Vinay Sharma",
        initials: "VS",
        role: "Frontend & Python Backend",
        bio: "Builds the React frontend and Flask backend, turning designs into smooth, interactive experiences backed by clean Python APIs.",
        color: "from-cyan-500 to-blue-600",
        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
        },
    },
];

const TeamSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-mono text-primary uppercase tracking-widest mb-3"
                    >
                        Final Year B.Tech CSE · 2022–26
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl font-extrabold mb-4 uppercase smooth-hover"
                    >
                        Meet the{" "}
                        <span className="neon-text">Team</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground font-mono max-w-2xl mx-auto"
                    >
                        {'>'} CodeSage is built by four students who believe learning to code should be accessible, engaging, and fun.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -8 }}
                        >
                            <Card className="cyber-card h-full">
                                <CardHeader className="text-center z-10 relative border-b border-border pb-6">
                                    {/* Gradient avatar with initials */}
                                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-primary/30 shadow-lg">
                                        <AvatarFallback
                                            className={`bg-gradient-to-br ${member.color} text-white text-xl font-bold`}
                                        >
                                            {member.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="uppercase tracking-wide text-base font-extrabold text-foreground">
                                        {member.name}
                                    </CardTitle>
                                    <p className="text-xs text-primary font-mono uppercase font-bold mt-1.5 tracking-widest">
                                        {member.role}
                                    </p>
                                </CardHeader>
                                <CardContent className="text-center pt-5 z-10 relative">
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                                        {member.bio}
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <a
                                            href={member.social.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                            aria-label="GitHub"
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={member.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* College tag */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs text-muted-foreground font-mono mt-12"
                >
                    Minor Project · Computer Science & Engineering · B.Tech 2022–2026
                </motion.p>
            </div>
        </section>
    );
};

export default TeamSection;
