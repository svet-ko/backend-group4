import express from "express";
import CategoriesController from "../controllers/categoriesController";
import { validateCategory } from "../middlewares/categoryValidate";
import { checkAuth as authenticateUser } from "../middlewares/checkAuth";
import { checkPermission as authorizePermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/", CategoriesController.getAllCategories);
router.get("/:categoryId", CategoriesController.getOneCategory);
router.post("/",  authenticateUser, CategoriesController.createCategory);
router.put("/:categoryId", authenticateUser, CategoriesController.updateCategory);
router.delete("/:categoryId", authenticateUser, CategoriesController.deleteCategory);

export default router;
