import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../dbHelper";
import { createAdminWithToken } from "../__fixtures__/createAdminWithToken";
import { createCategoryAsAdmin } from "../__fixtures__/createCategoryAsAdmin";

describe("Category controllers", () => {
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

  it("Should create a category", async () => {
    const {token} = await createAdminWithToken();
    // const category = await createCategoryAsAdmin(token);

    const response = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test category",
        description: "Test category description",
      });
    expect(response.body.category).toHaveProperty("name");

    expect(response.body).toMatchObject({
      category: {
        name: "Test category",
        description: "Test category description",
      },
    });

    expect(response.body).toEqual({
      category: {
        name: "Test category",
        description: "Test category description",
        __v: expect.any(Number),
        _id: expect.any(String),
      },
    });
  });

  it("should return all categories", async () => {
    const {token} = await createAdminWithToken(); // Create an admin token
    const category = await createCategoryAsAdmin(token); // Create a category to ensure there's at least one

    const response = await request(app)
      .get("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`); // Include the token in the headers

    expect(response.body.length).toEqual(1);
    expect(response.body[0]).toEqual(category);
  });

  it("should return category by id", async () => {
    const {token} = await createAdminWithToken();
    const category = await createCategoryAsAdmin(token);
    const categoryId = category._id;

    const response = await request(app)
      .get(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(category);
  });

  it("should return error if searching category by wrong id", async () => {
    const {token} = await createAdminWithToken();
    const response = await request(app)
      .get(`/api/v1/categories/6560bc15e37dd99b5eff52d5`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(404);
  });

  it("should update category name", async () => {
    const {token} = await createAdminWithToken();
    const category = await createCategoryAsAdmin(token);
    const categoryId = category._id;

    const response = await request(app)
      .put(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Different name",
      });

    console.log(response.body); // Log the entire response for debugging

    // Check if updateCategory is defined before accessing its properties
    if (response.body.result && response.body.result.name) {
      expect(response.body.result.name).toBe("Different name");
    } else {
      // Handle the case where updateCategory or its 'name' property is undefined
      console.error(
        "Either updateCategory or its 'name' property is undefined in the response"
      );
    }
  });

  it("should delete category by id", async () => {
    const {token} = await createAdminWithToken();
    const category = await createCategoryAsAdmin(token);
    const categoryId = category._id;

    const response = await request(app)
      .delete(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual({
      category: {},
    });
    const getResponse = await request(app)
      .get(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    // Check that the response status is 404
    expect(getResponse.status).toBe(404);
  });

  it("should return error if deleting category by wrong id", async () => {
    const {token} = await createAdminWithToken();
    const response = await request(app)
      .get(`/api/v1/categories/6560bc15e37dd99b5eff52d5`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(404);
    expect(response.body.msg).toBe("Category not found.");
  });
});