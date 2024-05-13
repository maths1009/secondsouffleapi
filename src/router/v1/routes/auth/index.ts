import { Router } from "express";
import loginRoute from "./login";
import logoutRoute from "./logout";

const router = Router();

router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

export default router;
