import request from "supertest";
import app from "../../src";
import { createProductAsAdmin } from "./createProductAsAdmin";

export async function createOrder(token: string, userId: string) {
  const product = await createProductAsAdmin(token);

  const response = await request(app)
    .post(`/api/v1/orders/checkout/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .send([
      {
        productId: product._id.toString(),
        quantity: 2,
      },
    ]);

  const order = response.body;

  return order;
}
