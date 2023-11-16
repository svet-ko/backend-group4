import jwt from "jsonwebtoken"
import { NextFunction, Response } from "express"
import { ApiError } from "../errors/ApiError.js"
import { AuthRequest, TokenPayload } from "../types/auth.js"

export function checkPermissions(
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
    const decodedUser = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;
    if (decodedUser.role === "ADMIN") {
        req.decoded = decodedUser;
        next();
        return;
    } else {
        next(ApiError.unauthorized("Permissions unauthorized"));
        return;
    }
  } catch (err) {
    next(ApiError.unauthorized("Invalid token"));
    return;
  }
}