import request from "supertest";

import app from "../../src";
import CategoryService from "../../src/services/productsService";
import connect, { MongoHelper } from "../dbHelper";
import CategoryRepo from "../../src/models/Category";
import ProductRepo from "../../src/models/Product";
import productsService from "../../src/services/productsService";
import { Category } from "../../types/category";
import { User } from "../../types/user";
import { ProductToCreate } from "products";
import mongoose from "mongoose";
import usersService from "../../src/services/usersService";
import ordersService from "../../src/services/ordersService";

describe("Products service", () => {
  let mongoHelper: MongoHelper;

  let productOne: mongoose.Document;
  let productTwo: mongoose.Document;
  let category: Category;

  async function createOrder() {
    const categoryInstance = new CategoryRepo({
      name: "Clothes",
      description: "Clothes description",
    });

    category = await categoryInstance.save();
    const firstHoody = new ProductRepo({
      title: "Hoody1",
      price: 150,
      description: "Cool hoodie for your good boy",
      categoryId: category._id,
      images: ["https://i.imgur.com/p8AjjXS.jpeg"],
    });
    const secondHoody = new ProductRepo({
      name: "Hoody2",
      description: "Cool hoodie for your good boy",
      price: 80,
      categoryId: category._id,
      images: ["https://i.imgur.com/p8AjjXS.jpeg"],
    });

    productOne = await firstHoody.save();
    productTwo = await secondHoody.save();

    const user = await usersService.createUser({
      id: "112",
      name: "Test name",
      email: "email@test.com",
      password: "password",
      role: "ADMIN",
      avatar: "avatar",
      address: "Address",
    });

    const orderRequest = [
      {
        productId: firstHoody.id,
        quantity: 2,
      },
      {
        productId: secondHoody.id,
        quantity: 1,
      },
    ];

    const totalPrice: number = await productsService.getTotalPrice(orderRequest);

    return await ordersService.createOrder(user.id, totalPrice);
  }

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new order", async () => {
    const order = await createOrder();
    expect(order).toHaveProperty("_id");
    expect(order).toHaveProperty("totalPrice");
  });

    it("should return a list of orders", async () => {
      await createOrder();
      const orders = await ordersService.getAllOrders();
      expect(orders.length).toEqual(1);
    });

    it("should find one order", async () => {
      const order = await createOrder();
      const foundOrder = await ordersService.getOrderById(
        order._id.toString()
      );
      expect(foundOrder?._id.toString()).toEqual(order._id.toString());
    });

    it("should delete one order", async () => {
      const order = await createOrder();
      await ordersService.deleteOrder(order._id.toString());
      const orders = await ordersService.getAllOrders();
      expect(orders.length).toEqual(0);
    });

    it("should delete all orders", async () => {
      const order = await createOrder();
      await ordersService.deleteAllOrders();
      const orders = await ordersService.getAllOrders();
      expect(orders.length).toEqual(0);
    });
});
