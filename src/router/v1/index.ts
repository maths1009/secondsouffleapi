import { Router } from "express";
import indexRoute from "./routes/index";

const router = Router();

router.use(indexRoute);

export default router;
