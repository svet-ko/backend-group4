import mongoose, { ObjectId } from "mongoose"
import ProductRepo from "../models/Product.js"
import { Product } from "../types/products.js"

async function findAll() {
  const products = await ProductRepo.find().exec()
  console.log('products: ', products)
  return products
}

async function findOne(productId: string) {
  const id = new mongoose.Types.ObjectId(productId)
  const product = await ProductRepo.findById(id)

  return product
}

async function createOne(product: Product) {
  const newProduct = new ProductRepo(product)
  return await newProduct.save()
}

async function updateOne(productId: string, updatesForProduct: Partial<Product>) {
  const id = new mongoose.Types.ObjectId(productId);
  const result = await ProductRepo.updateOne({ _id: id }, { $set: updatesForProduct });

  if (!result) {
    return null;
  }
  return await ProductRepo.findById(id);
}

async function deleteOne(productId: string){
  const id = new mongoose.Types.ObjectId(productId);
  return await ProductRepo.findByIdAndDelete(id);
}

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne
}
