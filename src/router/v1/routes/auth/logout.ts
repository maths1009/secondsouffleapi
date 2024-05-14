import { Router } from "express";

import { authenticateUser } from "@utils/auth";

const router = Router();

router.post("/", authenticateUser, async (_, res) => {
  res.json({ message: "Successful disconnection" });
});

export default router;
