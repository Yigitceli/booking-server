import { NextFunction, Request, Response } from "express";
import { IUser, newError } from "../../types";
import User from "../models/User";
import createError from "../utils/createError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const LOGIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser | null = await User.findOne({ userid: req.body.userid });
    if (user) {
      const accessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "3d" }
      );      
      return res.status(200).json({ payload: { user, accessToken } });
    }
    const newUser = new User(req.body);
    await newUser.save();
    const accessToken = jwt.sign(
      { user: newUser },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "3d" }
    );
    return res.status(200).json({ payload: { user: newUser, accessToken } });
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
