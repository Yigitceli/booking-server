import { NextFunction, Request, Response } from "express";
import { ITokenData, IUser, newError } from "../../types";
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
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { user: user },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: "90d" }
      );
      return res
        .status(200)
        .json({ payload: { user, accessToken, refreshToken } });
    }
    const newUser = new User(req.body);
    await newUser.save();
    const accessToken = jwt.sign(
      { user: newUser },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { user: newUser },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: "90d" }
    );
    return res
      .status(200)
      .json({ payload: { user: newUser, accessToken, refreshToken } });
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
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ userid: id });
    return res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    next(error);
  }
};

export const REFRESHTOKEN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.headers["refresh-token"] as string;

  try {
    if (!refreshToken)
      return next(
        createError(
          "Authorization Error",
          undefined,
          "Missing refresh token!",
          401
        )
      );
    
    const userData = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN as string
    ) as ITokenData;
    console.log(refreshToken);
    const accessToken = jwt.sign(
      { user: userData.user },
      process.env.ACCESS_TOKEN as string
    );
    return res.status(200).json({ payload: { accessToken } });
  } catch (error) {
    next(error);
  }
};
