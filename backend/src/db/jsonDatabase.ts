import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DataStore } from "../models/dataStore";
import { Feedback } from "../models/feedback";
import { User } from "../models/user";
import { Post } from "../models/post";

const DATA_PATH = path.resolve(process.cwd(), "db", "data.json");

const ensureDataFile = async (): Promise<void> => {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    if (!data.posts) {
      data.posts = [];
      await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
    }
  } catch {
    const fallback: DataStore = { lessons: [], feedback: [], users: [], posts: [] };
    await writeFile(DATA_PATH, JSON.stringify(fallback, null, 2), "utf-8");
  }
};

export const readData = async (): Promise<DataStore> => {
  await ensureDataFile();
  const raw = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as DataStore;
};

export const writeData = async (data: DataStore): Promise<void> => {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
};

export const appendFeedback = async (feedback: Feedback): Promise<Feedback> => {
  const data = await readData();
  data.feedback.push(feedback);
  await writeData(data);
  return feedback;
};

export const createUser = async (user: User): Promise<User> => {
  const data = await readData();
  data.users.push(user);
  await writeData(data);
  // Remove password before returning
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const data = await readData();
  return data.users.find((u) => u.email === email) || null;
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
  const data = await readData();
  const userIndex = data.users.findIndex((u) => u.id === userId);
  if (userIndex === -1) return null;

  data.users[userIndex] = { ...data.users[userIndex], ...updates };
  await writeData(data);
  const { password, ...userWithoutPassword } = data.users[userIndex];
  return userWithoutPassword as User;
};

export const createPost = async (post: Post): Promise<Post> => {
  const data = await readData();
  if (!data.posts) data.posts = [];
  data.posts.unshift(post); // Add new posts to the beginning
  await writeData(data);
  return post;
};

export const getPosts = async (): Promise<Post[]> => {
  const data = await readData();
  return data.posts || [];
};