import { Lesson } from "./lesson.js";
import { Feedback } from "./feedback.js";
import { User } from "./user.js";
import { Post } from "./post.js";

export interface DataStore {
  lessons: Lesson[];
  feedback: Feedback[];
  users: User[];
  posts: Post[];
}