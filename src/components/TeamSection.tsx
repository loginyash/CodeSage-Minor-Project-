import { Github, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const teamMembers: Array<{
    name: string;
    role: string;
    bio: string;
    avatar: string;
    social: {
        github: string;
        linkedin: string;
        twitter: string;
    };
}> = [
        // Team members removed as requested
    ];

const TeamSection = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl font-extrabold mb-4 uppercase smooth-hover"
                    >
                        Meet the <span className="neon-text">Team</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground font-mono max-w-2xl mx-auto"
                    >
                        {'>'} Code Sage is a major system constructed by a specialized team of developers.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -10 }}
                        >
                            <Card className="cyber-card">
                                <CardHeader className="text-center z-10 relative border-b border-cyber-cyan/20 pb-6">
                                    <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback className="bg-cyber-dark text-cyber-cyan">{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="uppercase tracking-widest neon-text select-none text-xl">{member.name}</CardTitle>
                                    <p className="text-sm text-cyber-yellow font-mono uppercase font-bold mt-2">{member.role}</p>
                                </CardHeader>
                                <CardContent className="text-center pt-6 z-10 relative bg-black/40">
                                    <p className="text-muted-foreground mb-6 font-mono text-sm">{member.bio}</p>
                                    <div className="flex justify-center gap-6">
                                        <a href={member.social.github} className="text-cyber-cyan/50 hover:text-cyber-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={member.social.linkedin} className="text-cyber-pink/50 hover:text-cyber-pink hover:shadow-[0_0_10px_rgba(255,0,60,0.8)] transition-all">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href={member.social.twitter} className="text-cyber-yellow/50 hover:text-cyber-yellow hover:shadow-[0_0_10px_rgba(252,238,10,0.8)] transition-all">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
