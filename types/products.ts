import { z } from "zod";

import { productSchema } from '../schemas/productSchema';

export interface ProductDTO extends z.infer<typeof productSchema> {};
export interface Product extends ProductDTO { _id: string };
export type ProductToCreate = Omit<ProductDTO, "category"> & {
  categoryId?: string;
};

export type ProductTitleFilter = {
  title: string,
  categoryId: string,
  price: number
};
//export type FindAllProductsOptions = z.mergeTypes<PaginationType, ProductFilters>;