import { z } from "zod";
import { userDataSchema } from "../schemas/userSchema.js";
import { loginRequestSchema } from "../schemas/loginRequestSchema.js";
import { JwtPayload } from "jsonwebtoken";

export type User = z.infer<typeof userDataSchema>

export type LoginRequest = z.infer<typeof loginRequestSchema>

export interface WithAuthRequest extends JwtPayload {
    decoded: DecodedUser
}

export type DecodedUser ={
    //userId: ...
    //email: ... whatever we use in
}