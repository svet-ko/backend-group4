import request from "supertest";
import app from "../../";
import UserService from "../../services/usersService";
import connect, { MongoHelper } from "../dbHelper";
import { createProductAsAdmin } from "../__fixtures__/createProductAsAdmin";

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

  it('should create an order and associated items successfully', async () => {

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

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newOrder');
  });
})