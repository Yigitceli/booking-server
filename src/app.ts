import express, { Request, Response, NextFunction, Application } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running at 5000")
);
