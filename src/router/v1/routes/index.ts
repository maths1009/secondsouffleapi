import { Router } from "express";

const router = Router();

router.get("/", async (_, res) => {
  res.send("Hello World!");
});

export default router;
