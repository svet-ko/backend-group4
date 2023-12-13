import request from "supertest"
import app from "../../src"
import { createCategoryAsAdmin } from "./createCategoryAsAdmin";

export async function createProductAsAdmin(token: string) {
  const category = await createCategoryAsAdmin(token);
  const categoryId = category._id;

  const response = await request(app).post("/api/v1/products").set('Authorization', `Bearer ${token}`).send({
    "title": "Another Hoody",
    "price": 150,
    "description": "Another hoodie for your good boy",
    "categoryId": categoryId,
    "images": [
        "https://i.imgur.com/p8AjjXS.jpeg"
    ]
  });

  const product = response.body.product;

  return product;
}