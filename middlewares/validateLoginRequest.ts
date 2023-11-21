import { NextFunction, Request, Response } from "express";
import { loginRequestSchema } from "../schemas/loginRequestSchema";

export async function validateLoginRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await loginRequestSchema.parseAsync(req.body);
        return next();
    } catch (error) {
        return res.status(400).json({ error});
    }
}