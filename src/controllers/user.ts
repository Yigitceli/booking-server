import { NextFunction, Request, Response } from "express";
import { newError } from "../../types";
import User from "../models/User";

export const LOGIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.json(newUser);
  } catch (error) {
    next(error);
  }
};

export const GETALLUSERS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.json({ payload: users });
    if (users.length <= 0 || !users) {
      const error = new Error("There are any users!") as newError;
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
