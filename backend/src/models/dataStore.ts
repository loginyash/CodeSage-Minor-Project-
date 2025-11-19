import { Lesson } from "./lesson.js";
import { Feedback } from "./feedback.js";
import { User } from "./user.js";

export interface DataStore {
  lessons: Lesson[];
  feedback: Feedback[];
  users: User[];
}