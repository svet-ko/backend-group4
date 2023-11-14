import express from "express"
import OrdersController from "../controllers/ordersController.js"

const router = express.Router();

// TO DO: auth middleware to authorize get all access
router.get("/", OrdersController.getAllOrders);
router.get("/:userId", OrdersController.getOrdersByUserId);
router.post("/checkout/:userId", OrdersController.createOrder);
router.delete("/delete", OrdersController.deleteAllOrders);
router.delete("/delete/:orderId", OrdersController.deleteOrder);
router.delete("/remove/:userId", OrdersController.deleteAllOrdersByUserId);

export default router;