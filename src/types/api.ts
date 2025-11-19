export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: string;
}

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