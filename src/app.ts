import express, { Request, Response, NextFunction, Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import indexRouter from "./routes";
import mongoose from "mongoose";
import { newError } from "../types";
import "../firebase/firebaseinit.ts";

dotenv.config();
const app: Application = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.DATABASE_URL as string, (error) => {
  if (error) {
    console.log("Can't connect database!");
    return;
  }
  console.log("Database connected!");
});

app.use("/api", indexRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorName = err.name || " ";
  const errorStack = err.stack || " ";
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    errorStatus,
    errorName,
    errorMessage,
    errorStack,
  });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running at 5000")
);
