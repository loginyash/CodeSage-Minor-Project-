import { CreateFeedbackPayload, Feedback } from "@/types/api";
import { apiClient } from "./apiClient";

export const getFeedback = async (): Promise<Feedback[]> => {
  return apiClient<Feedback[]>("/api/feedback");
};

export const sendFeedback = async (
  payload: CreateFeedbackPayload
): Promise<Feedback> => {
  return apiClient<Feedback>("/api/feedback", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};