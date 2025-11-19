export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
}