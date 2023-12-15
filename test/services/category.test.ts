import request from "supertest";
import app from "../../src"; // Assuming this is your Express application instance
import connect, { MongoHelper } from "../dbHelper";
import CategoryRepo from "../../src/models/Category";
import categoriesService from "../../src/services/categoriesService";
import mongoose from "mongoose";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;
  let categoryOne: mongoose.Document;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  beforeEach(async () => {
    const categoryInstance = new CategoryRepo({
      name: "Electronics",
      description: "Electronic gadgets and devices",
    });

    categoryOne = await categoryInstance.save();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new category", async () => {
    const categoryData = {
      name: "Clothing",
      description: "Clothing and apparel",
    };

    const newCategory = await categoriesService.createCategory(categoryData);

    expect(newCategory).toHaveProperty("_id");
    expect(newCategory?.name).toEqual("Clothing");
  });

  // it("should return a list of categories", async () => {
  //   const categories = await categoriesService.getAll();
  //   expect(categories.length).toEqual(1); // Assuming there is one category created in beforeEach
  // });

  // it("should find one category", async () => {
  //   const foundCategory = await categoriesService.getOne(
  //     categoryOne._id.toString()
  //   );
  //   expect(foundCategory?.name).toEqual("Electronics");
  //   expect(foundCategory?.description).toEqual(
  //     "Electronic gadgets and devices"
  //   );
  // });

  // it("should update category", async () => {
  //   const updatedCategory = await categoriesService.updateCategory(
  //     categoryOne._id.toString(),
  //     { name: "Updated Electronics" }
  //   );

  //   expect(updatedCategory?.name).toEqual("Updated Electronics");
  // });

  // it("should delete one category", async () => {
  //   await categoriesService.deleteCategory(categoryOne._id.toString());
  //   const categories = await categoriesService.getAll();
  //   expect(categories.length).toEqual(0);
  // });
});