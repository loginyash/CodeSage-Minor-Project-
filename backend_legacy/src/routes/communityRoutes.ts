import { Router } from "express";
import { getAllPosts, createNewPost } from "../controllers/communityController";

const router = Router();

router.get("/", getAllPosts);
router.post("/", createNewPost);

export default router;
