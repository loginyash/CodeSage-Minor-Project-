export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface CreateFeedbackPayload {
  name: string;
  email: string;
  message: string;
}