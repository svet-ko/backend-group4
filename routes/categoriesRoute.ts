import express from "express";
import {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController";
import { validateCategory } from "../middlewares/categoryValidate";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getOneCategory);
router.post("/", validateCategory, createCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
