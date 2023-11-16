import jwt from "jsonwebtoken"
import { NextFunction, Response } from "express"
import { ApiError } from "../errors/ApiError.js"
import { AuthRequest, TokenPayload } from "../types/auth.js"

export function checkAuth(
  req: AuthRequest,
  _: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    next(ApiError.forbidden("Token is missing"));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;
    req.decoded = decoded;
    next();
  } catch (err) {
    next(ApiError.forbidden("Invalid token"));
  }
}