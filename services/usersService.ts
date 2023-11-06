import mongoose, { ObjectId } from "mongoose"
import UsersRepo from "../models/User.js"
import { LoginRequest, User, UserDTO } from "../types/user.js"

async function getAllUsers() {
  const users = await UsersRepo.find().exec()
  return users
}

async function getUserById(userId: string) {
  const id = new mongoose.Types.ObjectId(userId)
  const user = await UsersRepo.findById(id)
  return user
}

async function createUser(user: UserDTO) {
  const newUser = new UsersRepo(user)
  return await newUser.save()
}

async function handleLogin(loginRequest: LoginRequest) {
  const { email, password } = loginRequest.body
  const user = await UsersRepo.findOne({ email, password});
  return user;
}

async function updateUser(userId: string, updatedUser: Partial<User>) {
  const id = new mongoose.Types.ObjectId(userId)
  const result = await UsersRepo.updateOne({ _id: id }, { $set: updatedUser });

  if (!result) {
    return null;
  }
  return await UsersRepo.findById(id);
}

async function deleteUser(userId: string){
  const id = new mongoose.Types.ObjectId(userId)
  return await UsersRepo.findByIdAndDelete(id);;
};

export default {
  getAllUsers,
  getUserById,
  handleLogin,
  createUser,
  updateUser,
  deleteUser
};
