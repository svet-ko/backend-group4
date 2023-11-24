import { z } from "zod";
import mongoose from "mongoose";

import { productSchema } from '../schemas/productSchema'

export interface ProductDTO extends z.infer<typeof productSchema> {};
export interface Product extends ProductDTO { _id: string };
export type ProductToCreate = Omit<ProductDTO, "category"> & {
  categoryId?: string;
};