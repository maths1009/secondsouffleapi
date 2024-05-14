import { prisma } from "@/app";
import { comparePassword, generateToken } from "@/utils/auth";
import { Request, Response } from "express";

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.users.findFirst({ where: { email: email } });
    const passwordMatch = await comparePassword(password, user?.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "incorrect email or password" });
    }
    const token = generateToken(user!.id.toString());
    res.json({ token });
  },
  logout: async (req: Request, res: Response) => {
    res.json({ message: "logout success" });
  },
};
