import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star, Target, Users } from "lucide-react";
import { sendFeedback, getFeedback } from "@/api/feedback";
import type { CreateFeedbackPayload, Feedback } from "@/types/api";
import { motion } from "framer-motion";

const encouragements = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Every Expert Was Once a Beginner",
    message: "Remember, even the most skilled developers started exactly where you are now. Every line of code you write is progress!",
    color: "text-pink-500"
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Mistakes Are Your Best Teachers",
    message: "Don't fear bugs or errors - they're actually signs you're learning! Every developer has written thousands of broken lines of code.",
    color: "text-yellow-500"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Focus on Progress, Not Perfection",
    message: "You don't need to understand everything at once. Take it one concept at a time, and celebrate every small victory!",
    color: "text-blue-500"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "You're Not Alone in This Journey",
    message: "Join thousands of learners just like you. Ask questions, share your wins, and remember - the coding community is incredibly supportive!",
    color: "text-green-500"
  }
];

const EncouragementSection = () => {
  const [formData, setFormData] = useState<CreateFeedbackPayload>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getFeedback()
      .then((entries) => {
        if (isMounted) {
          setFeedback(entries);
          setFeedbackError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setFeedbackError(err instanceof Error ? err.message : "Unable to load feedback");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFeedbackLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const newFeedback = await sendFeedback(formData);
      setFeedback((prev) => [newFeedback, ...prev]);
      setFormData({ name: "", email: "", message: "" });
      setSubmitMessage("Thanks for sharing! We'll keep cheering you on. 🎉");
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Unable to send feedback right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const recentFeedback = feedback.slice(0, 3);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            A Quick <span className="text-gradient">Reminder</span> 💝
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Learning to code can feel overwhelming sometimes. Here are some gentle reminders to keep you motivated:
          </motion.p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {encouragements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="glass-card h-full border-white/5">
                <CardContent className="p-8 space-y-4">
                  <div className={`${item.color} w-fit p-3 rounded-xl bg-white/5 backdrop-blur-sm`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.message}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Share your journey</CardTitle>
                <CardDescription>Send us a quick note about how you're feeling today.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                      className="bg-white/5 border-white/10 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@email.com"
                      required
                      disabled={isSubmitting}
                      className="bg-white/5 border-white/10 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share a win, a struggle, or a question..."
                      rows={4}
                      required
                      disabled={isSubmitting}
                      className="bg-white/5 border-white/10 focus:border-primary/50"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-glow transition-all hover:scale-[1.02]" disabled={isSubmitting}>
                    <Heart className="h-5 w-5" />
                    {isSubmitting ? "Sending..." : "Send some love"}
                  </Button>
                  {submitMessage && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground text-center"
                      role="status"
                    >
                      {submitMessage}
                    </motion.p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-panel border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Community shout-outs</CardTitle>
                <CardDescription>Latest messages from fellow learners.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {feedbackError && (
                  <p className="text-sm text-destructive" role="alert">
                    {feedbackError}
                  </p>
                )}
                {isFeedbackLoading &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={`feedback-skeleton-${index}`} className="space-y-2">
                      <Skeleton className="h-4 w-1/4 bg-white/5" />
                      <Skeleton className="h-4 w-3/4 bg-white/5" />
                      <Skeleton className="h-4 w-2/3 bg-white/5" />
                    </div>
                  ))}
                {!isFeedbackLoading && recentFeedback.length === 0 && (
                  <p className="text-sm text-muted-foreground">No feedback yet. Be the first to share!</p>
                )}
                {recentFeedback.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-primary">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-foreground/90">{entry.message}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EncouragementSection;