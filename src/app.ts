import express, { Express, Response } from "express";
import Router from "./router";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());

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
