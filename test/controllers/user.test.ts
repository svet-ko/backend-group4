import request from "supertest";
import app from "../../src";
import UserService from "../../src/services/usersService";
import UsersRepo from "../../src/models/User"
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

  it('should return a user when user signs up', async () => {
    const newUser = {
      name: "user",
      email:"user@email.com",
      password:"12324556"
    }

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email");
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


  it("should find user by id", async () => {
    const addedUser = await UserService.createUser({
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
      .get(`/api/v1/users/${addedUser?._id.toString()}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.body).toMatchObject({
      email:"user@email.com"
    });
  });

  it('should update user details', async () => {
  
    await UserService.createUser({
      id:"",
      name: "user",
      email: "user@email.com",
      password: "122345",
      avatar: "",
      role: "CUSTOMER"
    });
  
    const userUpdates = {
      name: "UPDATED USER",
    }
  
    const adminToken = await UserService.getToken({
      id: "111",
      name: "admin",
      email: "admin@email.com",
      avatar: "",
      role: "ADMIN"
    });

    const addedUser = await UsersRepo.findOne({email:"user@email.com"});

    const response = await request(app)
      .put(`/api/v1/users/${addedUser?._id.toString()}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(userUpdates);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: "UPDATED USER",
    });
  });
  
  it('Should delete user', async ()=> {
    const addedUser = await UserService.createUser({
      id:"",
      name: "user",
      email:"user@email.com",
      password:"122345",
      avatar:"",
      role:"CUSTOMER"
    });

    const deletedUser = await UsersRepo.findOne({email:"user@email.com"});

    const adminToken = await UserService.getToken({
      id:"111",
      name: "admin",
      email:"admin@email.com",
      avatar:"",
      role:"ADMIN"
    });

    const response = await request(app)
      .delete(`/api/v1/users/${addedUser?._id.toString()}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.body.msg).toEqual('User was deleted successfuly');
  })

  it('Should login an existing user', async ()=> {
    const addedUser = await UserService.createUser({
      id:"",
      name: "user",
      email:"user@email.com",
      password:"122345",
      avatar:"",
      role:"CUSTOMER"
    });

    const loginRequest = {
      email:"user@email.com",
      password:"122345"
    }
    const response = await request(app)
      .post(`/api/v1/auth/login`)
      .send(loginRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  })
});
