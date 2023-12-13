import jwt from "jsonwebtoken"
import { NextFunction, Response } from "express"
import { ApiError } from "../errors/ApiError"
import { AuthRequest, TokenPayload } from "../../types/auth"

export function checkAuth(req: AuthRequest, _: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    next(ApiError.forbidden("Token is missing"));
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as TokenPayload;
    req.decodedUser = decoded;
    next();
  } catch (err) {
    next(ApiError.forbidden("Invalid token"));
  }
}
