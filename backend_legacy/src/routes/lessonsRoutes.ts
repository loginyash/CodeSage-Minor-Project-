import { Router } from "express";
import { getLessons } from "../controllers/lessonsController.js";

const router = Router();

router.get("/", getLessons);

export default router;