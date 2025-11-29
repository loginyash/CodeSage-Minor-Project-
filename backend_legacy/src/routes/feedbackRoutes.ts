import { Router } from "express";
import { createFeedback, getFeedback } from "../controllers/feedbackController.js";

const router = Router();

router.get("/", getFeedback);
router.post("/", createFeedback);

export default router;