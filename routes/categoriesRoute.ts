import express from "express";
import {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController.js";
import { checkAuth as authenticateUser } from "../middlewares/checkAuth.js";
import {
  checkPermission as authorizePermission,
} from "../middlewares/checkPermission.js";
// import { validateCategory } from "../middlewares/categoryValidate.js";

const router = express.Router();

router.get("/", authenticateUser, authorizePermission, getAllCategories);
router.get("/:categoryId", authenticateUser, getOneCategory);
router.post("/",  authenticateUser, createCategory);
router.put("/:categoryId", authenticateUser, updateCategory);
router.delete("/:categoryId", authenticateUser, deleteCategory);

export default router;
