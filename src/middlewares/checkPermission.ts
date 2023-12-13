import { NextFunction, Response } from "express"
import { ApiError } from "../errors/ApiError"
import { AuthRequest } from "../../types/auth"

export function checkPermission(
  req: AuthRequest,
  _: Response,
  next: NextFunction
) {
    if (req.decodedUser?.role === "ADMIN") {
        next();
        return;
    } else {
        next(ApiError.forbidden("Permission unauthorized"));
        return;
    }
}