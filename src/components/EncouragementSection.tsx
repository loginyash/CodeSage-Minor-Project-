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

const encouragements = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Every Expert Was Once a Beginner",
    message: "Remember, even the most skilled developers started exactly where you are now. Every line of code you write is progress!",
    color: "text-secondary"
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Mistakes Are Your Best Teachers",
    message: "Don't fear bugs or errors - they're actually signs you're learning! Every developer has written thousands of broken lines of code.",
    color: "text-accent"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Focus on Progress, Not Perfection",
    message: "You don't need to understand everything at once. Take it one concept at a time, and celebrate every small victory!",
    color: "text-primary"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "You're Not Alone in This Journey",
    message: "Join thousands of learners just like you. Ask questions, share your wins, and remember - the coding community is incredibly supportive!",
    color: "text-secondary"
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
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            A Quick <span className="gradient-accent bg-clip-text text-transparent">Reminder</span> 💝
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learning to code can feel overwhelming sometimes. Here are some gentle reminders to keep you motivated:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {encouragements.map((item, index) => (
            <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className={`${item.color} w-fit p-3 rounded-xl bg-background`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-card">
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
                  />
                </div>
                <Button type="submit" variant="accent" size="lg" className="gap-2" disabled={isSubmitting}>
                  <Heart className="h-5 w-5" />
                  {isSubmitting ? "Sending..." : "Send some love"}
                </Button>
                {submitMessage && (
                  <p className="text-sm text-muted-foreground" role="status">
                    {submitMessage}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Community shout-outs</CardTitle>
              <CardDescription>Latest messages from fellow learners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackError && (
                <p className="text-sm text-destructive" role="alert">
                  {feedbackError}
                </p>
              )}
              {isFeedbackLoading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={`feedback-skeleton-${index}`} className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              {!isFeedbackLoading && recentFeedback.length === 0 && (
                <p className="text-sm text-muted-foreground">No feedback yet. Be the first to share!</p>
              )}
              {recentFeedback.map((entry) => (
                <div key={entry.id} className="rounded-lg border border-border p-4 space-y-1">
                  <p className="text-sm font-semibold">{entry.name}</p>
                  <p className="text-sm text-muted-foreground">{new Date(entry.createdAt).toLocaleString()}</p>
                  <p className="text-sm">{entry.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EncouragementSection;