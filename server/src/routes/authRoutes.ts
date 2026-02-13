import { Router } from "express";
import { getMe, login, register } from "../controllers/authController";
import { requireAuth } from "../middleware/auth";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, getMe);

export default authRouter;
