import request from "supertest";
import app from "../../";
import UserService from "../../services/usersService";
import connect, { MongoHelper } from "../dbHelper";
import { createProductAsAdmin } from "../__fixtures__/createProductAsAdmin";
import ItemsService from "../../services/itemsService";
import OrdersRepo from "../../models/Order"

describe("ORDER  CONTROLLERS", () => {
  let mongoHelper: MongoHelper | undefined; 

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    if (mongoHelper) {
      await mongoHelper.clearDatabase(); 
    }
  });

  afterAll(async () => {
    if (mongoHelper) {
      await mongoHelper.closeDatabase(); 
    }
  });

  test('createOrder', async () => {

    const addedUser = await UserService.createUser({
        id:"",
        name: "user",
        email:"user@email.com",
        password:"122345",
        avatar:"",
        role:"CUSTOMER"
    });

    const userId = addedUser._id.toString();
    const adminToken = await UserService.getToken({
        id: "111",
        name: "admin",
        email: "admin@email.com",
        avatar: "",
        role: "ADMIN"
      });
    const product1 = await createProductAsAdmin(adminToken);
    const product1Id = product1._id.toString();
    const product2 = await createProductAsAdmin(adminToken);
    const product2Id = product2._id.toString();
    const orderRequest = [
      { id: `${product1Id}`, quantity: 2 },
      { id: `${product2Id}`, quantity: 1 },
    ];

    const response = await request(app)
      .post(`/api/v1/orders/checkout/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(orderRequest);
    
    const items = await ItemsService.getAllItems();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newOrder');
    expect(items.length).toBe(2);
  });
  test('getAllOrders - admin only', async () => {

    const adminToken = await UserService.getToken({
        id: "111",
        name: "admin",
        email: "admin@email.com",
        avatar: "",
        role: "ADMIN"
      });
      const addedUser = await UserService.createUser({
        id:"",
        name: "user",
        email:"user@email.com",
        password:"122345",
        avatar:"",
        role:"CUSTOMER"
    });

    const userId = addedUser._id.toString();
    const order1 = new OrdersRepo({ userId: userId, totalPrice: 100 });
    await order1.save();
    const order2 = new OrdersRepo({ userId: userId, totalPrice: 100 });
    await order2.save();
    
    const response = await request(app)
      .get(`/api/v1/orders`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.body.orders.length).toBe(2);
  });

  test('deleteAllOrders - admin only', async () => {

    const adminToken = await UserService.getToken({
        id: "111",
        name: "admin",
        email: "admin@email.com",
        avatar: "",
        role: "ADMIN"
      });
      const addedUser = await UserService.createUser({
        id:"",
        name: "user",
        email:"user@email.com",
        password:"122345",
        avatar:"",
        role:"CUSTOMER"
    });

    const userId = addedUser._id.toString();
    const order1 = new OrdersRepo({ userId: userId, totalPrice: 100 });
    await order1.save();
    const order2 = new OrdersRepo({ userId: userId, totalPrice: 100 });
    await order2.save();
    
    const response = await request(app)
      .delete(`/api/v1/orders/`)
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(response.status).toBe(204);
    expect(response.body).toMatchObject({ msg: 'All orders (and order items) deleted successfuly' })
    // DELETING 500 INTERNAL ERROR !!! same in user.test
  })

  test('deleteOrder', async () => {
    const token = await UserService.getToken({
      id: "111",
      name: "admin",
      email: "admin@email.com",
      avatar: "",
      role:"CUSTOMER"
    });
    const orderId = "";
    
    const response = await request(app)
      .delete(`/api/v1/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);
  })
})