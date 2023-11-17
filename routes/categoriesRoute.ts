import express from "express";
import {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/categoryValidate.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getOneCategory);
router.post("/", validateCategory, createCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
