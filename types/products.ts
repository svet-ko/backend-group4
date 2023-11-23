import { z } from "zod";
import mongoose from "mongoose";

import { productSchema } from '../schemas/productSchema'

export type Product = z.infer<typeof productSchema> & { _id: string }
export type ProductToCreate = Omit<Product, "id"> & {
  categoryId?: mongoose.Types.ObjectId;
};

