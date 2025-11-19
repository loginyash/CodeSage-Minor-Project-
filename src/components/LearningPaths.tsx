import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Code, Palette, Database, Globe, Smartphone, Cpu, Search, CheckCircle2 } from "lucide-react";
import { getLessons } from "@/api/lessons";
import type { Lesson } from "@/types/api";

const fallbackIcons = [Globe, Code, Database, Palette, Smartphone, Cpu];

const LearningPaths = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await getLessons();
        if (isMounted) {
          setLessons(data);
          setFilteredLessons(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load lessons");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    load();

    // Load completed lessons
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");
    setCompletedLessons(completed);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let filtered = lessons;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by level
    if (levelFilter !== "all") {
      filtered = filtered.filter((lesson) => lesson.level.toLowerCase() === levelFilter.toLowerCase());
    }

    setFilteredLessons(filtered);
  }, [searchQuery, levelFilter, lessons]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    getLessons()
      .then(setLessons)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load lessons"))
      .finally(() => setIsLoading(false));
  };

  const difficultyClasses = useMemo(
    () => ({
      beginner: "bg-secondary text-secondary-foreground",
      intermediate: "bg-accent text-accent-foreground",
      advanced: "bg-primary text-primary-foreground",
    }),
    []
  );

  const renderCard = (lesson: Lesson, index: number) => {
    const Icon = fallbackIcons[index % fallbackIcons.length];
    const difficultyKey = lesson.level.toLowerCase() as keyof typeof difficultyClasses;
    const isCompleted = completedLessons.includes(lesson.id);
    
    return (
      <Card
        key={lesson.id}
        className="shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 cursor-pointer"
        onClick={() => navigate(`/lesson/${lesson.id}`)}
      >
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-2">
              {isCompleted && (
                <Badge variant="outline" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Done
                </Badge>
              )}
              <Badge className={difficultyClasses[difficultyKey] ?? "bg-muted text-muted-foreground"}>
                {lesson.level}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl">{lesson.title}</CardTitle>
          <CardDescription className="text-base">{lesson.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tailored micro-lesson</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/lesson/${lesson.id}`);
              }}
            >
              {isCompleted ? "Review" : "Start Learning"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSkeleton = (_: unknown, index: number) => (
    <Card key={`skeleton-${index}`} className="shadow-card">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );

  return (
    <section id="lessons" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-4xl font-bold">
            Choose Your <span className="gradient-hero bg-clip-text text-transparent">Learning Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't worry about picking the \"perfect\" path - you can always switch or explore multiple areas.
            Every journey starts with a single step! 🚀
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={levelFilter === "all" ? "default" : "outline"}
              onClick={() => setLevelFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={levelFilter === "beginner" ? "default" : "outline"}
              onClick={() => setLevelFilter("beginner")}
              size="sm"
            >
              Beginner
            </Button>
            <Button
              variant={levelFilter === "intermediate" ? "default" : "outline"}
              onClick={() => setLevelFilter("intermediate")}
              size="sm"
            >
              Intermediate
            </Button>
            <Button
              variant={levelFilter === "advanced" ? "default" : "outline"}
              onClick={() => setLevelFilter("advanced")}
              size="sm"
            >
              Advanced
            </Button>
          </div>
        </div>

        {error ? (
          <Card className="max-w-2xl mx-auto text-center space-y-4 p-10">
            <CardTitle className="text-2xl">We couldn't load the lessons</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{error}</CardDescription>
            <Button onClick={handleRetry}>Try again</Button>
          </Card>
        ) : (
          <>
            {filteredLessons.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                  ? Array.from({ length: 3 }).map(renderSkeleton)
                  : filteredLessons.map((lesson, index) => renderCard(lesson, index))}
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto text-center p-10">
                <CardTitle className="text-2xl mb-4">No lessons found</CardTitle>
                <CardDescription>
                  {searchQuery || levelFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No lessons available yet. Check back soon!"}
                </CardDescription>
                {(searchQuery || levelFilter !== "all") && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setLevelFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Card>
            )}
          </>
        )}

        {!isLoading && !error && lessons.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No lessons found just yet. Check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default LearningPaths;