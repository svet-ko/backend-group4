import { NextFunction, Request, Response } from "express";
import { loginRequestSchema } from "../schemas/loginRequestSchema.js";

export async function validateLoginRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await loginRequestSchema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}