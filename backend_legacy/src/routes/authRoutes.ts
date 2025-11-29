import { Router } from "express";
import { signup, login, updateProfile, getProfile } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/profile/:id", updateProfile);
router.get("/profile/:id", getProfile);

export default router;



