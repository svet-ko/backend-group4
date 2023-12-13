import express from "express"
import { checkAuth as authenticateUser } from "../middlewares/checkAuth"
import { checkPermission as authorizePermission } from "../middlewares/checkPermission"
import OrdersController from "../controllers/ordersController"

const router = express.Router();
// routes admin only
router.get("/", 
    authenticateUser,
    authorizePermission, 
    OrdersController.getAllOrders
);
router.delete("/", 
    authenticateUser, 
    authorizePermission,
    OrdersController.deleteAllOrders
); 
// routes for all logged in users
router.get("/user/:userId", 
    authenticateUser, 
    OrdersController.getOrdersByUserId
); 
router.delete("/user/:userId", 
    authenticateUser, 
    OrdersController.deleteAllOrdersByUserId
);
router.post("/checkout/:userId", 
    authenticateUser, 
    OrdersController.createOrder
);
router.delete("/:orderId", 
    authenticateUser, 
    OrdersController.deleteOrder
); 


export default router;