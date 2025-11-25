import { Router } from "express";
import { getAllPosts, createNewPost } from "../controllers/communityController.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/", createNewPost);

export default router;
