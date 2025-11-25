export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
  completed?: boolean;
}

export interface CreateFeedbackPayload {
  name: string;
  email: string;
  message: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
}