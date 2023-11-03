import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const loginRequestSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }),
});

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