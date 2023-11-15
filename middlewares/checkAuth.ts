import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { ApiError } from "../errors/ApiError.js"
import { DecodedUser } from "../types/auth.js"

export function checkAuth(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("TOKEN: ", token);
  if (!token) {
    next(ApiError.forbidden("Token is missing"));
  } else {
    try {
      const decodedUser = jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedUser;
      console.log("DECODED USER: ", decodedUser);
      next();
    } catch (err) {
      next(ApiError.forbidden("Invalid token"));
    }
  }
}