import { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";
import { appendFeedback, readData } from "../db/jsonDatabase.js";
import {
  CreateFeedbackPayload,
  Feedback,
} from "../models/feedback.js";

export const getFeedback = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await readData();
    res.json(data.feedback);
  } catch (error) {
    next(error);
  }
};

export const createFeedback = async (
  req: Request<unknown, unknown, CreateFeedbackPayload>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feedback: Feedback = {
      id: randomUUID(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    await appendFeedback(feedback);

    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};