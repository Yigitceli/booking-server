import { NextFunction, Request, Response } from "express";
import { newError } from "../../types";
import User from "../models/User";
import createError from "../utils/createError";

export const LOGIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });    
    if (user) {
      return res.status(200).json(user);
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
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
    if (users.length <= 0 || !users) {
      const error = createError(
        "Query error",
        undefined,
        "There are no user!",
        404
      );
      return next(error);
    }
    return res.status(200).json({ payload: users });
  } catch (error) {
    next(error);
  }
};

export const DELETEUSER = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOneAndDelete({ userid: req.user.userid });
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
