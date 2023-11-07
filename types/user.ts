import { z } from "zod";
import { ObjectId } from "mongoose";
import { userDataSchema } from "../schemas/userSchema.js";
import { loginRequestSchema } from "../schemas/loginRequestSchema.js";

export type User = z.infer<typeof userDataSchema>
//export type User = UserDTO & {_id: ObjectId}

export type LoginRequest = z.infer<typeof loginRequestSchema>