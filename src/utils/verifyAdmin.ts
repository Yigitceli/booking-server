import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest, newError } from "../../types";

const verifyAdmin = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdmin) {
    const error = new Error("User is not admin!") as newError;
    error.name = "Authentication Error";
    error.status = 401;
    next(error);
  }
};
