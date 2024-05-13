import express, { Express, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

app.use((_, res: Response, __) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
