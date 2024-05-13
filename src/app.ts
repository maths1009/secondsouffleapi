import express, { Express, Response } from "express";
import Router from "./router";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

// DATABASE
export const prisma = new PrismaClient();

//PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use(Router);

//404
app.use((_, res: Response, __) => {
  res.status(404).json({ message: "Not Found" });
});

//Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
