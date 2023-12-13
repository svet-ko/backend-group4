import request from "supertest";

import app from "../../src";
import CategoryService from "../../src/services/productsService";
import connect, { MongoHelper } from "../dbHelper";
import CategoryRepo from "../../src/models/Category";
import ProductRepo from "../../src/models/Product";
import productsService from "../../src/services/productsService";
import {Category} from "../../types/category";
import { ProductToCreate } from "products";
import mongoose from "mongoose";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;

  let productOne: mongoose.Document;
  let productTwo: mongoose.Document;
  let productThree: mongoose.Document;
  let category: Category;

  beforeEach(async () => {
    const categoryInstance = new CategoryRepo({
      name: "Clothes",
      description: "Clothes description"
    });

    category = await categoryInstance.save();
    const firstHoody = new ProductRepo({
      title: "Hoody1",
      price: 150,
      description: "Cool hoodie for your good boy",
      categoryId: category._id,
      images: [
          "https://i.imgur.com/p8AjjXS.jpeg"
      ]
    });
    const secondHoody = new ProductRepo({
      name: "Hoody2",
      description: "Cool hoodie for your good boy",
      price: 80,
      categoryId: category._id,
      images: [
        "https://i.imgur.com/p8AjjXS.jpeg"
    ]
    });
    const thirdHoody = new ProductRepo({
      name: "Hoody3",
      description: "Cool hoodie for your good boy",
      price: 54,
      categoryId: category._id,
      images: [
        "https://i.imgur.com/p8AjjXS.jpeg"
      ]
    });
    productOne = await firstHoody.save();
    productTwo = await secondHoody.save();
    productThree = await thirdHoody.save();
  });

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new product", async () => {
    const product: ProductToCreate = {
        title: "Another Hoody",
        price: 150,
        description: "Another hoodie for your good boy",
        categoryId: category._id.toString(),
        images: [
            "https://i.imgur.com/p8AjjXS.jpeg"
        ]
      }
    const newProduct = await productsService.createOne(product);
    expect(newProduct).toHaveProperty("_id");
    expect(newProduct?.title).toEqual("Another Hoody");
  });

  it("should return a list of products", async () => {
    const products = await productsService.findAll({title: '', price: 0, categoryId: ''});
    expect(products.length).toEqual(3);
  });

  it("should find one product", async () => {
    const foundProduct = await productsService.findOne(
      productOne._id.toString()
    );
    expect(foundProduct?.title).toEqual("Hoody1");
    expect(foundProduct?.description).toEqual("Cool hoodie for your good boy");
  });

  it("should update product", async () => {
    const updatedProduct = await productsService.updateOne(
      productOne._id.toString(),
      { title: "Fantastic Hoody" }
    );
    expect(updatedProduct?.title).toEqual("Fantastic Hoody");
  });

  it("should delete one product", async () => {
    await productsService.deleteOne(productOne._id.toString());
    const products = await productsService.findAll({title: '', price: 0, categoryId: ''});
    expect(products.length).toEqual(2);
  });
});