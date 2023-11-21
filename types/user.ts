import { z } from "zod";
import { userDataSchema } from "../schemas/userSchema";

export type User = z.infer<typeof userDataSchema> & { id: string }