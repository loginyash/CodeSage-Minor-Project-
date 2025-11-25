import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
    playlistId: string;
    title: string;
    isVideo?: boolean;
}

const VideoPlayer = ({ playlistId, title, isVideo = false }: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // High quality thumbnail for videos, default for playlists
    const thumbnailUrl = isVideo
        ? `https://img.youtube.com/vi/${playlistId}/maxresdefault.jpg`
        : `https://img.youtube.com/vi/${playlistId}/mqdefault.jpg`; // Playlists don't have a simple single thumbnail endpoint, using a fallback or the first video's thumb if possible. 
    // Actually for playlists it's tricky to get a good thumb without API. 
    // Let's use a generic coding placeholder or try to get the first video thumb if we knew it.
    // For now, let's assume we might need a better strategy for playlists, but let's try standard mqdefault of the playlist ID (which often doesn't work)
    // A better approach for playlists without API key is just to use a nice gradient or a static asset.
    // Let's use a nice gradient with the title for playlists if we can't get a thumb.

    // Actually, let's just load the iframe on click. For the thumbnail, we can use a nice placeholder if it's a playlist.
    // If it is a video, we use the maxresdefault.

    return (
        <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/10 shadow-inner group cursor-pointer" onClick={() => setIsPlaying(true)}>
            {!isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    {/* Attempt to show thumbnail if it's a video, otherwise show a nice pattern */}
                    {isVideo && (
                        <img
                            src={`https://img.youtube.com/vi/${playlistId}/maxresdefault.jpg`}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            onError={(e) => {
                                // Fallback if maxres doesn't exist
                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${playlistId}/hqdefault.jpg`;
                            }}
                        />
                    )}

                    {!isVideo && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20" />
                    )}

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative z-10 p-4 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20"
                    >
                        <Play className="h-8 w-8 fill-current" />
                    </motion.div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-medium truncate">{title}</p>
                        <p className="text-xs text-gray-300 mt-1">Click to load video</p>
                    </div>
                </div>
            ) : (
                <iframe
                    className="w-full h-full"
                    src={isVideo
                        ? `https://www.youtube.com/embed/${playlistId}?autoplay=1`
                        : `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            )}
        </div>
    );
};

export default VideoPlayer;
