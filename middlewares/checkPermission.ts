import { NextFunction, Response } from "express"
import { ApiError } from "../errors/ApiError.js"
import { AuthRequest } from "../types/auth.js"

export function checkPermission(
  req: AuthRequest,
  _: Response,
  next: NextFunction
) {
    if (req.decodedUser?.role === "ADMIN") {
        next();
        return;
    } else {
        next(ApiError.unauthorized("Permission unauthorized"));
        return;
    }
}