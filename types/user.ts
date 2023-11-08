import { z } from "zod";
import { userDataSchema } from "../schemas/userSchema.js";
import { loginRequestSchema } from "../schemas/loginRequestSchema.js";

export type User = z.infer<typeof userDataSchema>

export type LoginRequest = z.infer<typeof loginRequestSchema>