import { NextFunction, Request, Response } from "express";
import { newError } from "../../types";



const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdmin) {
    const error = new Error("User is not admin!");
    error.name = "Authentication Error";
    error.status = 401;
    next(error);
  } 
  next()
};

export default verifyAdmin
