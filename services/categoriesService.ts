import mongoose, { ObjectId } from "mongoose";
import CategoryRepo from "../models/Category.js";
import { Category } from "../types/category.js";

async function getAll() {
  const categories = await CategoryRepo.find().exec();
  return categories;
}

async function getOne(categoryId: string) {
  const id = new mongoose.Types.ObjectId(categoryId);
  const category = await CategoryRepo.findById(id);
  return category;
}

async function createCategory(category: Category) {
  const newCategory = new CategoryRepo(category);
  return await newCategory.save();
}

async function updateCategory(
  categoryId: string,
  updateCategory: Partial<Category>
) {
  const id = new mongoose.Types.ObjectId(categoryId);
  const result = await CategoryRepo.updateOne(
    { _id: id },
    { $set: updateCategory }
  );
  if (!result) {
    return null;
  }

  return await CategoryRepo.findById(id);
}

export async function deleteCategory(categoryId: string) {
  const id = new mongoose.Types.ObjectId(categoryId);
  return await CategoryRepo.findByIdAndDelete(categoryId);
}

export default {
  getOne,
  getAll,
  createCategory,
  updateCategory,
  deleteCategory,
};

