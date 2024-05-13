import { Router } from "express";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
