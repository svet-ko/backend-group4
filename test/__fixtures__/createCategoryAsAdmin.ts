import request from "supertest"
import app from "../../src"

export async function createCategoryAsAdmin(token: string) {
  const responseCategory = await request(app).post("/api/v1/categories").set('Authorization', `Bearer ${token}`).send({
    "name": "Test category",
    "description": "Test category description",
  });

  const category = responseCategory.body.category;

  return category;
}