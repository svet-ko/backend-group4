import { z } from "zod";
import { Request } from "express"
import { loginRequestSchema } from "../schemas/loginRequestSchema"
import { User } from "./user"

export type LoginRequest = z.infer<typeof loginRequestSchema>

export type TokenPayload = Omit<User, 'password'>

export interface AuthRequest extends Request {
    decodedUser?: TokenPayload
}

