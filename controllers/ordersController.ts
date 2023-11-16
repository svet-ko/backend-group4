import { NextFunction, Request, Response } from "express"
import OrdersService from "../services/ordersService.js"
import ItemsService from "../services/itemsService.js"
import ProductsService from "../services/productsService.js";
import { ApiError } from "../errors/ApiError.js"
import Item from "../models/Item.js";
import { OrderRequest } from "../types/orderRequest.js";

async function getAllOrders(
    _: Request, 
    res: Response, 
    next: NextFunction
) {
  const orders = await OrdersService.getAllOrders();
  if (!orders) {
    next(ApiError.resourceNotFound("No collection"));
    return;
  }
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
        next(ApiError.internal("Order could not be created"));
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
    const order = await OrdersService.getOrderById(id);
    if (order === null) {
      next(ApiError.resourceNotFound("Order that you are trying to delete does not exist")); 
      return;
    }
    await OrdersService.deleteOrder(id);
    await ItemsService.deleteItemsByOrderId(id);
    const deletedOrder = await OrdersService.getOrderById(id);
    if (deletedOrder !== null) {
        next(ApiError.internal("Deleting failed")); 
        return;
    }
    res.status(201).json({message: "Order deleted successfuly"});
}

async function deleteAllOrders(
    _: Request, 
    res: Response, 
    next: NextFunction
) {
    await OrdersService.deleteAllOrders();
    await ItemsService.deleteAllItems();
    const deletedOrders = await OrdersService.getAllOrders();
    const deletedItems = await ItemsService.getAllItems();
    if (deletedItems !== null && deletedOrders !== null) {
        next(ApiError.internal("Deleting failed")); 
        return;
    }
    res.status(201).json({ message: 'All orders (and order items) deleted successfuly' });

}

async function deleteAllOrdersByUserId(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const userId = req.params.userId;
    const orders = await OrdersService.getOrdersByUserId(userId);
    const ids = orders.map(order => order._id)
    await OrdersService.deleteAllOrdersByUserId(userId);
    await ItemsService.deleteItemsFromMultipleOrders(ids);
    const deletedOrders = await OrdersService.getOrdersByUserId(userId);
    if (deletedOrders !== null) {
        next(ApiError.internal("Deleting failed")); 
        return;
    }
    res.status(201).json({ message: 'Orders deleted successfuly' });
}

export default {
    getAllOrders,
    getOrdersByUserId,
    createOrder,
    deleteOrder,
    deleteAllOrders, 
    deleteAllOrdersByUserId
}