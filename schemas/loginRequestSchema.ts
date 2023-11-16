import { z } from "zod"

export const loginRequestSchema = z.object({
        email: z.string({
            required_error: "Email is required",
        }).email({
            message: "Please provide a valid email address",
        }),
        password: z.string({
            required_error: "Password is required",
        })
    
});
