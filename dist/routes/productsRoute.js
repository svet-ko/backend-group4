import express from "express";
import ProductController from "../controllers/productsController.js";
import { validateProduct } from "../middlewares/productValidate.js";
const router = express.Router();
router.get("/", ProductController.findAllProduct);
router.get("/:productId", ProductController.findOneProduct);
router.post("/", validateProduct, ProductController.createOneProduct);
router.use((req, res, next) => {
    console.log("👀 got here");
    res.on("finish", () => {
        console.log("Record created:", {
        /* log data */
        });
    });
    next();
});
export default router;
