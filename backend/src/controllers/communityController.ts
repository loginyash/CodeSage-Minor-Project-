import { Request, Response, NextFunction } from "express";
import { createPost, getPosts } from "../db/jsonDatabase.js";
import { Post } from "../models/post.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPosts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

export const createNewPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { author, content } = req.body;

        if (!author || !content) {
            res.status(400).json({ error: "Author and content are required" });
            return;
        }

        const newPost: Post = {
            id: uuidv4(),
            author,
            content,
            likes: 0,
            createdAt: new Date().toISOString(),
        };

        const savedPost = await createPost(newPost);
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};
