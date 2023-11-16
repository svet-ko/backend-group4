import express from "express"
import { checkPermissions as authorizePermissions } from "../middlewares/checkPermissions.js"
import OrdersController from "../controllers/ordersController.js"

const router = express.Router();

router.get("/", authorizePermissions, OrdersController.getAllOrders);
router.delete("/", authorizePermissions, OrdersController.deleteAllOrders); 
router.get("/user/:userId", OrdersController.getOrdersByUserId); 
router.delete("/user/:userId", OrdersController.deleteAllOrdersByUserId);
router.post("/checkout/:userId", OrdersController.createOrder);
router.delete("/:orderId", OrdersController.deleteOrder); 


export default router;