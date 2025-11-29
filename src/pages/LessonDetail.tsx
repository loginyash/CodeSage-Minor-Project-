import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, Clock, BookOpen, Code } from "lucide-react";
import { getLessons } from "@/api/lessons";
import type { Lesson } from "@/types/api";
import Navigation from "@/components/Navigation";
import YouTubePlaylist from "@/components/YouTubePlaylist";
import CodeEditorWindow from "@/components/Editor/CodeEditorWindow";

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setIsLoading(true);
        const lessons = await getLessons();
        const found = lessons.find((l) => String(l.id) === id);
        setLesson(found || null);

        // Check if lesson is completed
        const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
        setCompleted(completedLessons.includes(String(id)));
      } catch (error) {
        console.error("Failed to load lesson:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadLesson();
    }
  }, [id]);

  const handleComplete = () => {
    if (!id) return;
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
    if (!completedLessons.includes(id)) {
      completedLessons.push(id);
      localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
      setCompleted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 py-32">
          <Skeleton className="h-12 w-64 mb-6" />
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-8">The lesson you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    beginner: "bg-secondary text-secondary-foreground",
    intermediate: "bg-accent text-accent-foreground",
    advanced: "bg-primary text-primary-foreground",
  };

  const difficultyKey = lesson.level.toLowerCase() as keyof typeof difficultyColors;

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-4 py-32">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lessons
        </Button>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className={difficultyColors[difficultyKey]}>
                  {lesson.level}
                </Badge>
                {completed && (
                  <Badge variant="outline" className="gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold">{lesson.title}</h1>
              <p className="text-xl text-muted-foreground">{lesson.description}</p>
            </div>
          </div>

          <Tabs defaultValue="lesson" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="lesson">Lesson Content</TabsTrigger>
              <TabsTrigger value="editor">Code Playground</TabsTrigger>
            </TabsList>

            <TabsContent value="lesson" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Lesson Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h3>Introduction</h3>
                    <p>
                      Welcome to {lesson.title}! This lesson will guide you through the fundamentals
                      and help you build a solid foundation. Take your time, practice along the way,
                      and remember - every expert was once a beginner!
                    </p>

                    <h3>What You'll Learn</h3>
                    <ul>
                      <li>Core concepts and principles</li>
                      <li>Practical examples and exercises</li>
                      <li>Best practices and tips</li>
                      <li>Real-world applications</li>
                    </ul>

                    <h3>Getting Started</h3>
                    <p>
                      Ready to dive in? Follow along with the examples, try the exercises,
                      and don't hesitate to experiment. Learning by doing is the best way to
                      master new skills!
                    </p>

                    <div className="bg-muted p-6 rounded-lg my-6">
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
                          <p className="text-sm text-muted-foreground">
                            Take notes as you go! Writing things down helps reinforce your learning
                            and creates a valuable reference for later.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* YouTube Playlist */}
              {lesson.videoUrl && (
                <YouTubePlaylist
                  playlistId={lesson.videoUrl}
                  title={lesson.title}
                  description={`Free tutorial for ${lesson.title}. Perfect for visual learners!`}
                  isVideo={lesson.isVideo}
                />
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>~30 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Beginner friendly</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleComplete}
                  disabled={completed}
                  className="gap-2"
                >
                  {completed ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Lesson Completed!
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Mark as Complete
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="editor">
              <div className="h-[800px] border rounded-lg overflow-hidden bg-background/50 backdrop-blur">
                <CodeEditorWindow height="100%" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
