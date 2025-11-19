import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

interface YouTubePlaylistProps {
  playlistId: string;
  title: string;
  description?: string;
  isVideo?: boolean;
}

const YouTubePlaylist = ({ playlistId, title, description, isVideo = false }: YouTubePlaylistProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-red-500" />
          Video Tutorials
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={isVideo 
              ? `https://www.youtube.com/embed/${playlistId}`
              : `https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Watch this free tutorial to supplement your learning. These videos are from trusted
          educational channels and are completely free!
        </p>
      </CardContent>
    </Card>
  );
};

export default YouTubePlaylist;



