import { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  console.log(token);
  try {
    const user = {
      isAdmin: true,
    };
    req.user = user;
    next();
  } catch (error) {}
};
export default verifyToken;
