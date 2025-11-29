import { Request, Response, NextFunction } from "express";
import { readData } from "../db/jsonDatabase.js";

export const getLessons = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await readData();
    res.json(data.lessons);
  } catch (error) {
    next(error);
  }
};