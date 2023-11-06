import { NextFunction, Request, Response } from "express";
import CategoriesService from "../services/categoriesService.js";
import { ApiError } from "../errors/ApiError.js";

export function getAllCategory(_: Request, res: Response, next: NextFunction) {
  try {
    const categories = CategoriesService.getAll();
    res.json(categories);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export function getOneCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = Number(req.params.id);
    const category = CategoriesService.getOne(categoryId);
    if (!category) {
      const notFoundError = ApiError.resourceNotFound("Category not found.");
      return next(notFoundError);
    }
    res.json(category);
  } catch (error) {
    const internalServerError = ApiError.internal("Internal server error.");
    next(internalServerError);
  }
}

export function createOneCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newCategory = req.body;
    const category = CategoriesService.createOne(newCategory);
    res.status(201).json(category);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = Number(req.params.id);
    const updateCategoryData = req.body;
    const category = CategoriesService.getOne(categoryId);
    if (!category) {
      return next(ApiError.resourceNotFound("Category not found."));
    }
    const updatedCategory = CategoriesService.updateCategory(
      categoryId,
      updateCategoryData
    );
    res.json(updatedCategory);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = Number(req.params.id);
    const category = CategoriesService.getOne(categoryId);
    if (!category) {
      next(ApiError.resourceNotFound("Category not found."));
      return;
    }
    CategoriesService.deleteCategory(categoryId);
    res.status(200).json(category);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export default getAllCategory;
