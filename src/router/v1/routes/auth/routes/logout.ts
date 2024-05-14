import { Router } from "express";
import { authenticateUser } from "@/utils/auth";
import { authController } from "../controller";

const router = Router();

router.post("/", authenticateUser, authController.logout);

export default router;
