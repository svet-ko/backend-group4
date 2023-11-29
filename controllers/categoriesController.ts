import { NextFunction, Request, Response } from "express";

import CategoriesService from "../services/categoriesService";
import { ApiError } from "../errors/ApiError";

interface ValidationError {
  errors: {
    [field: string]: {
      message: string;
    };
  };
}

export async function getAllCategories(_: Request, res: Response) {
  const categories = await CategoriesService.getAll();
  res.json(categories);
}

export async function getOneCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const categoryId = req.params.categoryId;
  const category = await CategoriesService.getOne(categoryId);

  if (!category) {
    next(ApiError.resourceNotFound("Category not found."));
    return;
  }
  res.json(category);
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newCategory = req.body;
    const category = await CategoriesService.createCategory(newCategory);
    res.status(201).json({ category });
  } catch (error: any) {
    res.status(500).json({ msg: "something went wrong" });
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const categoryId = req.params.categoryId;
  const categoryData = req.body;
  const category = CategoriesService.getOne(categoryId);

  if (!category) {
    next(ApiError.resourceNotFound("Category not found"));
    return;
  }

  const result = await CategoriesService.updateCategory(
    categoryId,
    categoryData
  );
  res.status(200).json({ result });
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const categoryId = req.params.categoryId;
  const category = CategoriesService.getOne(categoryId);

  if (category === null) {
    next(ApiError.resourceNotFound("Category does not exist"));
    return;
  }

  CategoriesService.deleteCategory(categoryId);
  res.status(200).json({ category });
}

export default {
  getOneCategory,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
