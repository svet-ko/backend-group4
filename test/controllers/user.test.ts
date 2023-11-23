import request from "supertest";
import app from "../../";
import UserService from "../../services/usersService";
import UsersRepo from "../../models/User"
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

  it('should return a token when user signs up', async () => {
    const newUser = {
      name: "user",
      email:"user@email.com",
      password:"12324556"
    }

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should return users array", async () => {
    await UserService.createUser({
      id:"112",
      name: "user",
      email:"user@email.com",
      password:"122345",
      avatar:"",
      role:"CUSTOMER"
    });

    const adminToken = await UserService.getToken({
      id:"111",
      name: "admin",
      email:"admin@email.com",
      avatar:"",
      role:"ADMIN"
    });
    const response = await request(app)
      .get("/api/v1/users")
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.body.users.length).toEqual(1);
    expect(response.body.users[0]).toMatchObject({
      name: "user",
    });
  });

  it('should update user details', async () => {
    await UserService.createUser({
      id:"6555c6003cf167f32a077849",
      name: "user",
      email:"user@email.com",
      password:"122345",
      avatar:"",
      role:"CUSTOMER"
    });


    const userUpdates = {
      name:"UPDATED USER",
      password:"updated_password"
    }

    const adminToken = await UserService.getToken({
      id:"111",
      name: "admin",
      email:"admin@email.com",
      avatar:"",
      role:"ADMIN"
    });

    const response = await request(app)
      .put("/api/v1/users/655f75ce3739e50845dec535")
      .set('Authorization', `Bearer ${adminToken}`)
      .send(userUpdates);

    const users = await request(app)
      .get("/api/v1/users")
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('USERS: ', users.body.users);
    console.log('response: ', response.body);

    expect(response.status).toBe(200);
    expect(response.body.updatedUser).toMatchObject({
      name:"UPDATED USER",
      password:"updated_password"
    });
  });
  it('Should delete user', async ()=> {
    await UserService.createUser({
      id:"655f75ce3739e50845dec535",
      name: "user",
      email:"user@email.com",
      password:"122345",
      avatar:"",
      role:"CUSTOMER"
    });

    const adminToken = await UserService.getToken({
      id:"111",
      name: "admin",
      email:"admin@email.com",
      avatar:"",
      role:"ADMIN"
    });

    const response = await request(app)
      .delete("/api/v1/users/655f75ce3739e50845dec535")
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(204);
  })
});
