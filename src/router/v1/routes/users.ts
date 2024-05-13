import { Router } from "express";
import { prisma } from "../../../app";
import { authenticateUser } from "../../../utils/auth";

const router = Router();

router.get("/", authenticateUser, async (_, res) => {
  try {
    const users = await prisma.users.findMany();
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
