import { z } from "zod";

const RoleEnum = z.enum(['ADMIN', 'CUSTOMER']);

export const userDataSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: RoleEnum.default('CUSTOMER'),
  avatar: z.string()
    .url({
      message: "Avatar must be a valid URL if provided",
    })
    .default("https://api.lorem.space/image/face?w=640&h=480&r=867")
});
