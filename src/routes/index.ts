import { Router, Request, Response, NextFunction } from "express";
import userRouter from "./user";

const indexRouter = Router();

indexRouter.use("/user", userRouter)

export default indexRouter;
