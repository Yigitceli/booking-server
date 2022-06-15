import { Router } from "express";
import { LOGIN, GETALLUSERS, DELETEUSER } from "../controllers/user";
import User from "../models/User";
import verifyAdmin from "../utils/verifyAdmin";
import verifyToken from "../utils/verifyToken";

const userRouter = Router();

userRouter.post("/login", LOGIN);
userRouter.get("/", verifyToken ,verifyAdmin, GETALLUSERS)
userRouter.delete("/", verifyToken, verifyAdmin, DELETEUSER)

export default userRouter;
