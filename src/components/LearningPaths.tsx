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
import { motion, AnimatePresence } from "framer-motion";

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
      beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      intermediate: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      advanced: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    }),
    []
  );

  const renderCard = (lesson: Lesson, index: number) => {
    const Icon = fallbackIcons[index % fallbackIcons.length];
    const difficultyKey = lesson.level.toLowerCase() as keyof typeof difficultyClasses;
    const isCompleted = completedLessons.includes(lesson.id);

    return (
      <motion.div
        key={lesson.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
      >
        <Card
          className="glass-card h-full cursor-pointer group border-white/5"
          onClick={() => navigate(`/lesson/${lesson.id}`)}
        >
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit group-hover:bg-primary/20 transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2">
                {isCompleted && (
                  <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    Done
                  </Badge>
                )}
                <Badge className={difficultyClasses[difficultyKey] ?? "bg-muted text-muted-foreground"}>
                  {lesson.level}
                </Badge>
              </div>
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{lesson.title}</CardTitle>
            <CardDescription className="text-base line-clamp-2">{lesson.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm text-muted-foreground">Tailored micro-lesson</span>
              <Button
                variant="ghost"
                size="sm"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
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
      </motion.div>
    );
  };

  const renderSkeleton = (_: unknown, index: number) => (
    <Card key={`skeleton-${index}`} className="glass-card">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-10 rounded-lg bg-white/5" />
          <Skeleton className="h-6 w-24 rounded-full bg-white/5" />
        </div>
        <Skeleton className="h-6 w-3/4 bg-white/5" />
        <Skeleton className="h-4 w-full bg-white/5" />
        <Skeleton className="h-4 w-5/6 bg-white/5" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full bg-white/5" />
      </CardContent>
    </Card>
  );

  return (
    <section id="lessons" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center space-y-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Choose Your <span className="text-gradient">Learning Path</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Don't worry about picking the "perfect" path - you can always switch or explore multiple areas.
            Every journey starts with a single step! 🚀
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 border-white/10 focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <Button
                key={level}
                variant={levelFilter === level ? "default" : "outline"}
                onClick={() => setLevelFilter(level)}
                size="sm"
                className={`capitalize ${levelFilter === level ? 'bg-primary shadow-glow' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {error ? (
          <Card className="max-w-2xl mx-auto text-center space-y-4 p-10 glass-panel">
            <CardTitle className="text-2xl">We couldn't load the lessons</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{error}</CardDescription>
            <Button onClick={handleRetry}>Try again</Button>
          </Card>
        ) : (
          <AnimatePresence mode="wait">
            {filteredLessons.length > 0 ? (
              <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {isLoading
                  ? Array.from({ length: 3 }).map(renderSkeleton)
                  : filteredLessons.map((lesson, index) => renderCard(lesson, index))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="max-w-2xl mx-auto text-center p-10 glass-panel">
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
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {!isLoading && !error && lessons.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No lessons found just yet. Check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default LearningPaths;