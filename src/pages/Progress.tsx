import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";
import { getLessons } from "@/api/lessons";
import Navigation from "@/components/Navigation";

const ProgressPage = () => {
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    progress: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const lessons = await getLessons();
        const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
        
        setStats({
          totalLessons: lessons.length,
          completedLessons: completedLessons.length,
          progress: lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "text-green-500";
    if (progress >= 50) return "text-blue-500";
    if (progress >= 25) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-6xl px-4 py-32">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Your <span className="gradient-hero bg-clip-text text-transparent">Progress</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your learning journey and celebrate your achievements!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.progress}%</div>
                <Progress value={stats.progress} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.completedLessons} of {stats.totalLessons} lessons completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedLessons}</div>
                <p className="text-xs text-muted-foreground">
                  Lessons finished
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalLessons - stats.completedLessons}
                </div>
                <p className="text-xs text-muted-foreground">
                  Lessons remaining
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.progress >= 100 ? "🏆" : stats.progress >= 75 ? "🥇" : stats.progress >= 50 ? "🥈" : stats.progress >= 25 ? "🥉" : "⭐"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.progress >= 100 ? "Master!" : stats.progress >= 75 ? "Expert" : stats.progress >= 50 ? "Advanced" : stats.progress >= 25 ? "Intermediate" : "Beginner"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Goals
              </CardTitle>
              <CardDescription>
                Set and track your learning objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Complete your first lesson</span>
                  <Badge variant={stats.completedLessons > 0 ? "default" : "outline"}>
                    {stats.completedLessons > 0 ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <Progress value={stats.completedLessons > 0 ? 100 : 0} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Complete 50% of lessons</span>
                  <Badge variant={stats.progress >= 50 ? "default" : "outline"}>
                    {stats.progress >= 50 ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <Progress value={Math.min(stats.progress, 50) * 2} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Complete all lessons</span>
                  <Badge variant={stats.progress >= 100 ? "default" : "outline"}>
                    {stats.progress >= 100 ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <Progress value={stats.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;



