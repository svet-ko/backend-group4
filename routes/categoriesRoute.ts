import express from "express";
import {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController";
import { validateCategory } from "../middlewares/categoryValidate";
import { checkAuth as authenticateUser } from "../middlewares/checkAuth";
import { checkPermission as authorizePermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getOneCategory);
router.post("/",  authenticateUser, createCategory);
router.put("/:categoryId", authenticateUser, updateCategory);
router.delete("/:categoryId", authenticateUser, deleteCategory);

export default router;
