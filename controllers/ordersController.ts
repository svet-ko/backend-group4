import { NextFunction, Request, Response } from "express"
import OrdersService from "../services/ordersService.js"
import { ApiError } from "../errors/ApiError.js"

async function getAllOrders(_: Request, res: Response) {
  const orders = await OrdersService.getAllOrders();
  res.json({ orders });
}

async function getOrderByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.params.userId;
    const order = await OrdersService.getOrderByUserId(userId);
    if (!order) {
      next(ApiError.resourceNotFound("This user has no orders"));
      return;
    }
    res.json({ order });
}

async function createOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const userId = req.params.userId;
    const newOrder = await OrdersService.createOrder(userId);
    res.status(201).json({ newOrder });
}

export default {
    getAllOrders,
    getOrderByUserId,
    createOrder
}