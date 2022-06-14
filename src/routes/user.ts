import { Router } from "express";
import { LOGIN, GETALLUSERS } from "../controllers/user";
import User from "../models/User";

const userRouter = Router();

userRouter.post("/login", LOGIN);
userRouter.get("/", GETALLUSERS)

export default userRouter;
