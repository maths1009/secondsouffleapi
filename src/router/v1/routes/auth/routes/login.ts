import { Router } from "express";
import { authController } from "../controller";

const router = Router();

router.post("/", authController.login);

export default router;
