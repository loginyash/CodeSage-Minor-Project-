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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl font-extrabold uppercase smooth-hover"
          >
            Free <span className="neon-text">Video Tutorials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl font-mono text-muted-foreground max-w-2xl mx-auto"
          >
            {'>'} Supplement your learning with these visual training modules. 
            <br />{'>'} Visual learning protocols initiated. 🎥
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsWithVideos.map((lesson, index) => {
            const playlist = youtubePlaylists[lesson.id];
            if (!playlist) return null;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -10 }}
              >
                <Card className="cyber-card h-full border-white/5">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2 z-10 relative">
                      <div className="p-2 rounded-sm bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/30 shadow-[0_0_10px_rgba(255,0,60,0.2)]">
                        <Play className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl uppercase tracking-wide neon-text select-none group-hover:text-cyber-cyan transition-colors">{lesson.title}</CardTitle>
                    </div>
                    <CardDescription className="z-10 relative font-mono text-muted-foreground">{playlist.channel}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 z-10 relative">
                    <VideoPlayer
                      playlistId={playlist.playlistId}
                      title={playlist.title}
                      isVideo={playlist.isVideo}
                    />
                    <Link to={`/lesson/${lesson.id}`}>
                      <Button variant="outline" className="w-full gap-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-dark uppercase font-bold tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all rounded-sm">
                        <ExternalLink className="h-4 w-4" />
                        Watch Tutorial
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



