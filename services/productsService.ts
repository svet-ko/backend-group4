import mongoose from "mongoose";

import ProductRepo from "../models/Product";
import { Product, ProductDTO, ProductToCreate } from "../types/products";
import CategoryRepo from "../models/Category";
import { Category } from "../types/category";
import { OrderRequest } from "../types/orderRequest";

async function findAll() {
  const products = await ProductRepo.find().populate("category").exec();
  
  return products;
}

async function findOne(productId: string) {
  const id = new mongoose.Types.ObjectId(productId);
  const product = await ProductRepo.findById(id).populate("category");

  return product;
}

async function createOne(product: ProductToCreate) {
  const category: Category | null = await CategoryRepo.findOne({
    _id: product.categoryId,
  });
  if (category) {
    delete product.categoryId;
    const newProduct: ProductDTO = {...product, category: category};
    const responseProduct = new ProductRepo(newProduct);
    return await responseProduct.save();
  }
  return null;
}

async function updateOne(
  productId: string,
  updatesForProductInput: Partial<ProductToCreate>
) {
  const id = new mongoose.Types.ObjectId(productId);
  let updatesWithCategory: Partial<ProductDTO> | undefined;

  if (!!updatesForProductInput.categoryId) {
    const category: Category | null = await CategoryRepo.findOne({
      _id: updatesForProductInput.categoryId,
    });

    if (category) {
      delete updatesForProductInput.categoryId;
      updatesWithCategory = {...updatesForProductInput, category: category};
    } else {
      return;
    }
  }

  const result = await ProductRepo.updateOne(
    { _id: id },
    { $set: !!updatesWithCategory ? updatesWithCategory : updatesForProductInput }
  );

  if (!result) {
    return null;
  }
  return await ProductRepo.findById(id);
}

async function getTotalPrice(
  orderItems: OrderRequest[]
): Promise<number>{
  const inputIds = orderItems.map((item) => item.id);
  const products = await ProductRepo.find({_id: inputIds});
  const sum = products.reduce((acc, product) => {
    const inputTargetItem = orderItems.find((item) =>
      product._id.equals(item.id)
    );
    if (product.price) {
      return !!inputTargetItem
        ? acc + inputTargetItem.quantity * product.price
        : acc;
    }
    return acc;
  }, 0);
  return sum; 
}

async function deleteOne(productId: string) {
  const id = new mongoose.Types.ObjectId(productId);
  return await ProductRepo.findByIdAndDelete(id).populate("category");
}

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  getTotalPrice,
};
