import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { getPosts, createPost } from "@/api/community";
import { Post } from "@/types/api";
import { toast } from "sonner";
import { MessageSquare, Heart, Share2, Send } from "lucide-react";

const Community = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            toast.error("Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error("You must be logged in to post");
            return;
        }
        if (!newPostContent.trim()) return;

        setIsSubmitting(true);
        try {
            const post = await createPost({
                author: user.name || "Anonymous",
                content: newPostContent,
            });
            setPosts([post, ...posts]);
            setNewPostContent("");
            toast.success("Post created successfully!");
        } catch (error) {
            toast.error("Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <main className="container mx-auto px-4 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
                            Community Hub
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Connect, share, and learn with fellow developers.
                        </p>
                    </div>

                    {/* Create Post Section */}
                    <div className="glass-panel p-6 rounded-2xl mb-8">
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-primary">
                                        {user?.name?.[0]?.toUpperCase() || "?"}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <Textarea
                                        placeholder="What's on your mind? Share a tip, question, or achievement..."
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        className="bg-white/5 border-white/10 min-h-[100px] focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !newPostContent.trim()}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    {isSubmitting ? "Posting..." : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Post
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Posts Feed */}
                    <div className="space-y-6">
                        {isLoading ? (
                            <div className="text-center py-12">Loading community...</div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                No posts yet. Be the first to share something!
                            </div>
                        ) : (
                            posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass-panel p-6 rounded-2xl hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                                            {post.author[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-lg">{post.author}</h3>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>

                                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                    <span>{post.likes}</span>
                                                </button>
                                                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span>Comment</span>
                                                </button>
                                                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                                                    <Share2 className="w-4 h-4" />
                                                    <span>Share</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Community;
