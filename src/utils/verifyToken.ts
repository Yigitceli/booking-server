import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types";
import { auth } from "../../firebase/firebaseinit";
import createError from "./createError";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  try {
    if (token) {
      try {
        const userData = await auth.verifyIdToken(token);
                
        
        return next();
      } catch (error) {
        const err = createError(
          "Error",
          undefined,
          "Invalid access token",
          401
        );
        console.log("test");
        return next(err);
      }
    }
    const err = createError("Error", undefined, "Missing access token", 401);
    return next(err)
  } catch (error) {
    return next(error);
  }
};
export default verifyToken;
