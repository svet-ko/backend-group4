// WILL CHANGE INTO SOMETHING LIKE THIS:

/*import mongoose, { ObjectId } from "mongoose"
import ProductRepo from "../models/Product.js"
import { Product } from "../types/products.js"

async function findAll() {
  const products = await ProductRepo.find().exec()

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

export default {
  findOne,
  findAll,
  createOne,
}*/


import { CategoryRepo } from "../models/Category.js";
import { Category } from "../types/category.js";

const categoriesRepo = new CategoryRepo();

function getAll() {
  const categories = categoriesRepo.getAll();
  return categories;
}

function getOne(categoryId: number) {
  const category = categoriesRepo.getOne(categoryId);
  return category;
}

function findIndex(categoryId: number) {
  const categoryIndex = categoriesRepo.findIndex(categoryId);
  return categoryIndex;
}

function createOne(category: Category) {
  const newCategory = categoriesRepo.createOne(category);
  return newCategory;
}

function updateCategory(categoryId: number, category: Category) {
  const updateCategory = categoriesRepo.updateCategory(categoryId, category);
  return updateCategory;
}

function deleteCategory(categoryId: number) {
  const category = categoriesRepo.deleteCategory(categoryId);
  return category;
}

export default {
  getOne,
  getAll,
  createOne,
  findIndex,
  updateCategory,
  deleteCategory,
};
