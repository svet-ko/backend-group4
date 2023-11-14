import { NextFunction, Request, Response } from "express"
import OrdersService from "../services/ordersService.js"
import ProductsService from "../services/productsService.js";
import { ApiError } from "../errors/ApiError.js"
import Item from "../models/Item.js";
import { OrderRequest } from "../types/orderRequest.js";

async function getAllOrders(_: Request, res: Response) {
  const orders = await OrdersService.getAllOrders();
  res.json({ orders });
}

async function getOrdersByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.params.userId;
    const orders = await OrdersService.getOrdersByUserId(userId);
    if (!orders) {
      next(ApiError.resourceNotFound("This user has no orders"));
      return;
    }
    res.json({ orders });
}

async function createOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const userId: string = req.params.userId;
    const arr: OrderRequest[] = req.body; 
    const totalPrice: number = await ProductsService.getTotalPrice(arr);
    const newOrder = await OrdersService.createOrder(userId, totalPrice);
    if (!newOrder) {
        next(ApiError.resourceNotFound("Order could not be created"));
        return;
    }
    const orderId = newOrder._id
    await Promise.all(
        arr.map((item) => {
            const orderItem = new Item({
                orderId,
                productId: item.id,
                quantity: item.quantity,
            });
            orderItem.save();
        })
    );  
    res.status(201).json({ newOrder });
}

async function deleteOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.params.orderId;
    const order = OrdersService.getOrderById(id);
    if (order === null) {
      next(ApiError.resourceNotFound("Order that you are trying to delete does not exist")); 
      return;
    }
    OrdersService.deleteOrder(id);
    res.status(201).json({message: "Order deleted"});
}

async function deleteAllOrders(
    _: Request, 
    res: Response, 
    next: NextFunction
) {
    OrdersService.deleteAllOrders();
    res.status(201).json({ message: 'All orders deleted successfully' });
}

async function deleteAllOrdersByUserId(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const userId = req.params.userId;
    await OrdersService.deleteAllOrdersByUserId(userId);
    res.status(201).json({ message: 'Orders deleted successfully' });
}

export default {
    getAllOrders,
    getOrdersByUserId,
    createOrder,
    deleteOrder,
    deleteAllOrders, // should be protected for highest level
    deleteAllOrdersByUserId
}