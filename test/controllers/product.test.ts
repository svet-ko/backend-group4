import request from "supertest"
import app from "../../"
import ProductService from "../../services/productsService"
import connect, { MongoHelper } from "../dbHelper"


describe("Product controllers", () => {
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

  it("Should create a product", async () => {
    const response = await request(app).post("/api/v1/products").send({
      title: "Another Hoody",
      price: 150,
      description: "Another hoodie for your good boy",
      categoryId: "654ce4e4e76430986466021c",
      images: [
          "https://i.imgur.com/p8AjjXS.jpeg"
      ]
    });
    expect(response.body.category).toHaveProperty("title");
    expect(response.body).toMatchObject({ product: {
        title: "Another Hoody",
        price: 150,
        description: "Another hoodie for your good boy",
        categoryId: "654ce4e4e76430986466021c",
        images: [
            "https://i.imgur.com/p8AjjXS.jpeg"
        ]
      } 
    });
    expect(response.body).toEqual({
      product: {
        title: "Another Hoody",
        price: 150,
        description: "Another hoodie for your good boy",
        categoryId: "654ce4e4e76430986466021c",
        images: [
          "https://i.imgur.com/p8AjjXS.jpeg"
        ],
        __v: expect.any(Number),
        _id: expect.any(String),
      },
    });
  });

  // it("should not create new category");

  // // find all category
  // it("should return all category", async () => {
  //   // create a category
  //   await ProductService.createOne({ title: "Test product" });

  //   const response = await request(app).get("/api/v1/products");

  //   expect(response.body.products.length).toEqual(1);
  //   expect(response.body.products[0]).toMatchObject({ title: "Test product" });
  // });
});