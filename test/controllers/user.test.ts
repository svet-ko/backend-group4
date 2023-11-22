import request from "supertest"
import app from "../../"
import UserService from "../../services/usersService"
import connect, { MongoHelper } from "../dbHelper"


describe("User controllers", () => {
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

  /*it("Should create a new user", async () => {
    // const document = await CategoryService.createOne({ name: "new cat" });
    // console.log("document:", document);
    // expect(document).toHaveProperty("name");

    const response = await request(app).post("/api/v1/users/signup").send({
      name: "Customer",
      email: "customer@email.com",
      password: "123456"
    });
    expect(response.body.newUser).toHaveProperty("name");
    expect(response.body).toMatchObject({ newUser: { name: "Customer" } });
    expect(response.body).toEqual({
      newUser: {
        name: "Customer",
        email: "customer@email.com",
        password: "123456",
        role: "CUSTOMER",
        avatar: expect.any(String),
        __v: expect.any(Number),
        _id: expect.any(String),
      },
    });
  });*/
  
    it('should return a token when creating a user', async () => {
      const res = await request(app).post("/api/v1/users/signup");
  
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });
  });

  // it("should not create new category");

  // find all users
  /*it("should return all users", async () => {
    await UserService.createOne({ name: "category1" });

    const response = await request(app).get("/api/v1/categories");

    expect(response.body.categories.length).toEqual(1);
    expect(response.body.categories[0]).toMatchObject({
      name: "category1",
    });
  });*/
