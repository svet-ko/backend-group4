import { z } from "zod";
import { loginRequestSchema } from "../schemas/loginRequestSchema.js";

export type LoginRequest = z.infer<typeof loginRequestSchema>

export interface WithAuthRequest extends Request {
    decoded?: DecodedUser
}
  
export type DecodedUser ={
    //userId: ...
    //email: ... whatever we use in
}