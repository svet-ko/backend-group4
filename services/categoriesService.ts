import mongoose, { ObjectId } from "mongoose"
import CategoryRepo from "../models/Category.js"
import { Category } from "../types/category.js"

async function getAll() {
  const categories = await CategoryRepo.find().exec()
  return categories
}

async function getOne(categoryId: number) {
  const id = new mongoose.Types.ObjectId(categoryId.toString())
  const category = await CategoryRepo.findById(id)
  return category
}

async function createOne(category: Category) {
  const newCategory = new CategoryRepo(category)
  return await newCategory.save()
}

export default {
  getOne,
  getAll,
  createOne
}


/*import { CategoryRepo } from "../models/Category.js";
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
};*/
