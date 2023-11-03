import express from "express";
import {
  createOneCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController.js";

const router = express.Router();

// Get all categories
router.get("/", getAllCategory);

// Get a category by ID
router.get("/:categoryId", getOneCategory);

// Create a new category
router.post("/", createOneCategory);

// Update a category
router.put("/:categoryId", updateCategory);

// Delete a category
router.delete("/:categoryId", deleteCategory);

export default router;
