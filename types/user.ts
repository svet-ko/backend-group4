import { z } from "zod";
import { userDataSchema } from "../schemas/userSchema.js";
import { loginRequestSchema } from "../schemas/loginRequestSchema.js";

export type UserDTO = z.infer<typeof userDataSchema>
export type User = UserDTO & {id: number}

export type LoginRequest = z.infer<typeof loginRequestSchema>