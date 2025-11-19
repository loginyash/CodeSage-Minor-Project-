import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message || "Something went wrong";

  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  res.status(statusCode).json({ message });
};