import { z } from "zod";
import { userDataSchema } from "../schemas/userSchema.js";

export type User = z.infer<typeof userDataSchema> & { id: string }
export type TokenPayload = Omit<User, 'password'>;