import { NextFunction, Request, Response } from "express"
import OrdersService from "../services/ordersService.js"
import ItemsService from "../services/itemsService.js";
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
    const { userId, orderId } = req.body;
    const totalAmount = await ItemsService.getTotalAmountByOrderId(orderId)
    const newOrder = await OrdersService.createOrder(userId, totalAmount);
    res.status(201).json({ newOrder });
}

export default {
    getAllOrders,
    getOrderByUserId,
    createOrder
}
/*
async (req, res) => {
    const {
      name,
      products,
    }: {
      name: string
      products: {
        id: string
        quantity: number
      }[]
    } = req.body
    const order = new Order({ name })
    await order.save()
  
    const orderId = order._id
    console.log("orderId:", orderId)
  
    await Promise.all(
      products.map((product) => {
        const orderItem = new OrderItem({
          orderId,
          productId: product.id,
          quantity: product.quantity,
        })
        orderItem.save()
      })
    )
  
    res.status(201).json({ message: "order is created", order })
  })*/