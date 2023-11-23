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
 it('should return a token when creating a user', async () => {
      console.log("-----------")
    });
  
  });