import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { getLessons } from "@/api/lessons";
import { useEffect, useState } from "react";
import type { Lesson } from "@/types/api";
import { youtubePlaylists } from "@/utils/youtubePlaylists";

const VideoTutorialsSection = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await getLessons();
        setLessons(data);
      } catch (error) {
        console.error("Failed to load lessons:", error);
      }
    };
    loadLessons();
  }, []);

  const lessonsWithVideos = lessons.filter((lesson) => youtubePlaylists[lesson.id]);

  if (lessonsWithVideos.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            Free <span className="gradient-hero bg-clip-text text-transparent">Video Tutorials</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Supplement your learning with these completely free video tutorial playlists from trusted
            educational channels. Perfect for visual learners! 🎥
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsWithVideos.map((lesson) => {
            const playlist = youtubePlaylists[lesson.id];
            if (!playlist) return null;

            return (
              <Card key={lesson.id} className="shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  </div>
                  <CardDescription>{playlist.channel}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={playlist.isVideo 
                        ? `https://www.youtube.com/embed/${playlist.playlistId}`
                        : `https://www.youtube.com/embed/videoseries?list=${playlist.playlistId}`}
                      title={playlist.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <Link to={`/lesson/${lesson.id}`}>
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Full Lesson
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All video tutorials are completely free and from trusted educational channels.
            No sign-up required! 🎉
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoTutorialsSection;



