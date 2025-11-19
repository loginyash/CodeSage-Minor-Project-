import { Lesson } from "@/types/api";
import { apiClient } from "./apiClient";

export const getLessons = async (): Promise<Lesson[]> => {
  return apiClient<Lesson[]>("/api/lessons");
};