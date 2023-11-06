import express from "express"

import ProductController from "../controllers/productsController.js"
import { validateProduct } from "../middlewares/productValidate.js"

const router = express.Router()
router.get("/", ProductController.findAllProduct)
router.get("/:productId", ProductController.findOneProduct)
router.post("/", validateProduct, ProductController.createOneProduct)
//router.delete("/:productId", ProductController.deleteOneProduct)
//router.put("/:productId", ProductController.updateOneProduct)

export default router