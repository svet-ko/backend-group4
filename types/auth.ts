import { z } from "zod";
import { loginRequestSchema } from "../schemas/loginRequestSchema.js";

export type LoginRequest = z.infer<typeof loginRequestSchema>

