import { Post } from "@/types/api";

const API_URL = "http://localhost:5000/api/community";

export const getPosts = async (): Promise<Post[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    return response.json();
};

export const createPost = async (post: { author: string; content: string }): Promise<Post> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
};
