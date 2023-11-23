import { z } from "zod";
import mongoose from "mongoose";

import { productSchema } from '../schemas/productSchema'

export type ProductDTO = z.infer<typeof productSchema>;
export type Product = ProductDTO & { _id: string };
export type ProductToCreate = Omit<ProductDTO, "category"> & {
  categoryId?: string;
};