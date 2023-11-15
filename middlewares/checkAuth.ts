import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import { WithAuthRequest } from "../types/user.js"
import { ApiError } from "../errors/ApiError.js"

export async function checkAuth(
    req: WithAuthRequest | Request, 
    res: Response, 
    next: NextFunction
) {
    const token = req.headers.authorization.split(" ")[1] 
    if (!token) {
        next(ApiError.forbidden('Token is missing'));
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.TOEKN_STRING as string)
        console.log('decoded :', decoded)
        //req.decoded = decoded
        next()
      } catch (err) {
        next(ApiError.forbidden('Authentication failed'));
      }
}