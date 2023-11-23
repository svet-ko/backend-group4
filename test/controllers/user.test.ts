import request from "supertest";
import app from "../../";
import UserService from "../../services/usersService";
import connect, { MongoHelper } from "../dbHelper";

describe("User controllers", () => {
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

  it('should return a token when creating a user', async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      name: "user",
      email:"user@email.com",
      password:"12324556"
    })
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });
});
