import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { getLessons } from "@/api/lessons";
import { useEffect, useState } from "react";
import type { Lesson } from "@/types/api";
import { youtubePlaylists } from "@/utils/youtubePlaylists";
import { motion } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";

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
    <section className="py-20 px-4 bg-muted/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Free <span className="text-gradient">Video Tutorials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Supplement your learning with these completely free video tutorial playlists from trusted
            educational channels. Perfect for visual learners! 🎥
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsWithVideos.map((lesson, index) => {
            const playlist = youtubePlaylists[lesson.id];
            if (!playlist) return null;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card h-full border-white/5">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-full bg-red-500/10 text-red-500">
                        <Play className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    </div>
                    <CardDescription>{playlist.channel}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <VideoPlayer
                      playlistId={playlist.playlistId}
                      title={playlist.title}
                      isVideo={playlist.isVideo}
                    />
                    <Link to={`/lesson/${lesson.id}`}>
                      <Button variant="outline" className="w-full gap-2 border-white/10 hover:bg-white/5 hover:text-primary transition-colors">
                        <ExternalLink className="h-4 w-4" />
                        View Full Lesson
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
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



