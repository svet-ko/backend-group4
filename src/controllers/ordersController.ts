import { NextFunction, Request, Response } from "express";
import OrdersService from "../services/ordersService";
import ItemsService from "../services/itemsService";
import ProductsService from "../services/productsService";
import { ApiError } from "../errors/ApiError";
import Item from "../models/Item";
import { OrderRequest } from "../../types/orderRequest";

async function getAllOrders(_: Request, res: Response, next: NextFunction) {
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
  res.json(orders);
}

async function createOrder(req: Request, res: Response, next: NextFunction) {
  const userId: string = req.params.userId;
  const arr: OrderRequest[] = req.body;
  const totalPrice: number = await ProductsService.getTotalPrice(arr);
  const newOrder = await OrdersService.createOrder(userId, totalPrice);
  if (!newOrder) {
    next(ApiError.internal("Order could not be created"));
    return;
  }
  const orderId = newOrder._id;
  await Promise.all(
    arr.map(async (item) => {
      const orderItem = new Item({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
      });
      await orderItem.save();
      const _productId = orderItem.productId?.toString();
      const _orderId = orderItem.orderId?.toString();
      const savedItem =
        _productId &&
        _orderId &&
        (await ItemsService.getItem(_productId, _orderId));
      if (!savedItem) {
        next(ApiError.internal("Item could not be created"));
        return;
      }
    })
  );
  res.status(201).json(newOrder);
}

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  const id = req.params.orderId;
  const order = await OrdersService.getOrderById(id);
  console.log('order', order);
  if (order === null) {
    next(
      ApiError.resourceNotFound(
        "Order that you are trying to delete does not exist"
      )
    );
    return;
  }
  const deletedOrder = await OrdersService.deleteOrder(id);
  console.log('deletedOrder', deletedOrder);
  await ItemsService.deleteItemsByOrderId(id);
  const deletedOrderInTheRepo = await OrdersService.getOrderById(id);
  console.log('deletedOrderInTheRepo', deletedOrderInTheRepo);
  if (deletedOrderInTheRepo !== null) {
    next(ApiError.internal("Deleting failed"));
    return;
  }
  console.log('before success');
  res.status(204).json(deletedOrder);
}

async function deleteAllOrders(_: Request, res: Response, next: NextFunction) {
  await OrdersService.deleteAllOrders();
  await ItemsService.deleteAllItems();
  const deletedOrders = await OrdersService.getAllOrders();
  const deletedItems = await ItemsService.getAllItems();
  if (deletedItems.length > 0 && deletedOrders.length > 0) {
    next(ApiError.internal("Deleting failed"));
    return;
  }
  res
    .status(204)
    .json({ msg: "All orders (and order items) deleted successfuly" });
}

async function deleteAllOrdersByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const orders = await OrdersService.getOrdersByUserId(userId);
  const ids = orders.map((order) => order._id);
  await OrdersService.deleteAllOrdersByUserId(userId);
  await ItemsService.deleteItemsFromMultipleOrders(ids);
  const deletedOrders = await OrdersService.getOrdersByUserId(userId);
  if (deletedOrders.length > 0) {
    next(ApiError.internal("Deleting failed"));
    return;
  }
  res.status(204).json({ msg: "Orders deleted successfuly" });
}

export default {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
  deleteOrder,
  deleteAllOrders,
  deleteAllOrdersByUserId,
};
