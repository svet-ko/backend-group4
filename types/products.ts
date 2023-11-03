import { z } from "zod";
import { Category } from "./categories.js";
import { productSchema } from '../middlewares/productValidate.js'

export type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: Category,
  images?: string[]
}

export type ProductToCreate = {
  title: string,
  price: number,
  description: string,
  categoryId: number,
  images?: string[]
}

export type ProductDTO = z.infer<typeof productSchema>
export type VProductToCreate = ProductDTO & ProductToCreate;

