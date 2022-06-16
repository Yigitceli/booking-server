import { NextFunction, Request, Response } from "express";
import { ITokenData, IUser } from "../../types";
import { auth } from "../../firebase/firebaseinit";
import createError from "./createError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  try {
    if (token) {
      try {
        const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN as string) as ITokenData;        
        req.user = tokenData.user;
        return next();
      } catch (error) {
        const err = createError(
          "Error",
          undefined,
          "Invalid access token",
          401
        );
        return next(err);
      }
    }
    const err = createError("Error", undefined, "Missing access token", 401);
    return next(err);
  } catch (error) {
    return next(error);
  }
};
export default verifyToken;
