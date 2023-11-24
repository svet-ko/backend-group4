import { z } from "zod";
import { categorySchema } from "../schemas/categorySchema";
import mongoose from "mongoose";

export type CategoryDTO = z.infer<typeof categorySchema>;
// export type Category = CategoryDTO & { id: number };

export type Category = CategoryDTO & {_id: mongoose.Types.ObjectId}
export type CreateCategoryInput = CategoryDTO
