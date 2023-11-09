import express from "express"
import OrdersController from "../controllers/ordersController.js"

const router = express.Router();

// TO DO: auth middleware to authorize get all access
router.get("/", OrdersController.getAllOrders);
router.get("/:userId", OrdersController.getOrderByUserId);
router.post("/checkout", OrdersController.createOrder);


export default router;