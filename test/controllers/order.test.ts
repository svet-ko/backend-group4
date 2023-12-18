import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../dbHelper";
import { createAdminWithToken } from "../__fixtures__/createAdminWithToken";
import { createProductAsAdmin } from "../__fixtures__/createProductAsAdmin";
import { createOrder } from "../__fixtures__/createOrder";

describe("Order controllers", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("Should create a order", async () => {
    const {token, user} = await createAdminWithToken();
    const product = await createProductAsAdmin(token);

    const response = await request(app)
      .post(`/api/v1/orders/checkout/${user._id.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .send([{
        productId: product._id.toString(),
        quantity: 2
      }]);

    expect(response.body).toHaveProperty("totalPrice");

    expect(response.body).toMatchObject({
      userId: user._id.toString(),
      totalPrice: product.price*2
    });
  });

  it("should return all orders", async () => {
    const {token, user} = await createAdminWithToken();
    const order = await createOrder(token, user.id);

    const response = await request(app)
    .get("/api/v1/orders")
    .set("Authorization", `Bearer ${token}`)

    expect(response.body.orders.length).toEqual(1);
    expect(response.body.orders[0]).toEqual(order);
  });

  it("should return orders by user id", async () => {
    const {token, user} = await createAdminWithToken();
    const order = await createOrder(token, user.id);

    const response = await request(app)
    .get(`/api/v1/orders/user/${user.id}`)
    .set("Authorization", `Bearer ${token}`)

    expect(response.body.length).toEqual(1);
    expect(response.body[0].userId).toEqual(user.id);
  });

  it("should delete order by id", async () => {
    const {token, user} = await createAdminWithToken();
    const order = await createOrder(token, user.id);

    const response = await request(app)
      .delete(`/api/v1/orders/${order._id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log('delete order by id response', response.body);
    expect(response.status).toBe(204);
  });
});
