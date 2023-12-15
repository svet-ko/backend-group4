import UserService from "../../src/services/usersService";
import UsersRepo from "../../src/models/User"
import connect, { MongoHelper } from "../dbHelper";

describe("User services", () => {
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

  it("should create a new user", async () => {

    const newUser = await UserService.createUser({
        id:"112",
        name: "user",
        email:"user@email.com",
        password:"122345",
        avatar:"",
        role:"CUSTOMER"
      });
    expect(newUser).toHaveProperty("_id");
    expect(newUser.name).toEqual("user");
  });

  // it("should return a list", async () => {

  //   const newUser = new UsersRepo({
  //       name: "user",
  //       email:"user@email.com",
  //       password:"122345"
  //   });

  //   await newUser.save();
  //   const users = await UserService.getAllUsers();
  //   expect(users.length).toEqual(1);
  // });

  // it("should find user by id", async () => {

  //   const newUser = new UsersRepo({
  //       name: "user",
  //       email:"user@email.com",
  //       password:"122345"
  //   });

  //   await newUser.save();
  //   const user = await UserService.getUserById(newUser._id.toString());
  //   expect(user).toMatchObject({
  //       name: "user",
  //   });
  // });

  // it("should return token", async () => {
  //   const token = await UserService.getToken({
  //       id:"112",
  //       name: "user",
  //       email:"user@email.com",
  //       avatar:"",
  //       role:"CUSTOMER"
  //   });
  //    expect(token).not.toBe(null);
  // });

  // it('Should update user', async () => {
  //   const newUser = await UserService.createUser({
  //       id:"112",
  //       name: "user",
  //       email:"user@email.com",
  //       password:"122345",
  //       avatar:"",
  //       role:"CUSTOMER"
  //     });

  //   const userUpdates = {
  //       name: "UPDATED NAME"
  //   }
  //   const id = newUser._id.toString()
  //   const updatedUser = await UserService.updateUser(id, userUpdates);
  //   expect(updatedUser).toMatchObject(userUpdates);
  // })
  // it('Should delete user', async () => {
  //   const newUser = await UserService.createUser({
  //       id:"112",
  //       name: "user",
  //       email:"user@email.com",
  //       password:"122345",
  //       avatar:"",
  //       role:"CUSTOMER"
  //     });

  //   const id = newUser._id.toString()
  //   await UserService.deleteUser(id);
  //   const deleted = await UsersRepo.findById(id)
  //   expect(deleted).toBe(null);
  // })
});