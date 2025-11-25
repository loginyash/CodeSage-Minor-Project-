import express from "express";
import cors from "cors";
import lessonsRouter from "./routes/lessonsRoutes.js";
import feedbackRouter from "./routes/feedbackRoutes.js";
import authRouter from "./routes/authRoutes.js";
import communityRouter from "./routes/communityRoutes.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/lessons", lessonsRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/auth", authRouter);
app.use("/api/community", communityRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;