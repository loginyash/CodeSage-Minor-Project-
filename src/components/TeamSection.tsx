import { Github, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
    {
        name: "Student Developer 1",
        role: "Full Stack Developer",
        bio: "Passionate about building scalable web applications and AI integration.",
        avatar: "https://github.com/shadcn.png",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#",
        },
    },
    {
        name: "Student Developer 2",
        role: "Frontend Specialist",
        bio: "Crafting beautiful and intuitive user experiences with React and Tailwind.",
        avatar: "https://github.com/shadcn.png",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#",
        },
    },
    {
        name: "Student Developer 3",
        role: "Backend Engineer",
        bio: "Ensuring robust API performance and secure database architecture.",
        avatar: "https://github.com/shadcn.png",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#",
        },
    },
];

const TeamSection = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Code Sage is a Major Project built with passion by a team of dedicated computer science students.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <Card key={index} className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-colors">
                            <CardHeader className="text-center">
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                </Avatar>
                                <CardTitle>{member.name}</CardTitle>
                                <p className="text-sm text-primary font-medium">{member.role}</p>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground mb-6">{member.bio}</p>
                                <div className="flex justify-center gap-4">
                                    <a href={member.social.github} className="text-muted-foreground hover:text-primary transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
