import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import UsersRepo from "../models/User.js"
import { LoginRequest } from "../types/auth.js"
import { User, UserDTO } from "../types/user.js"

async function getAllUsers() {
  const users = await UsersRepo.find().exec();
  return users;
}

async function getUserById(userId: string) {
  const id = new mongoose.Types.ObjectId(userId);
  const user = await UsersRepo.findById(id);
  return user;
}

async function createUser(user: Partial<User>) {
  const newUser = new UsersRepo(user);
  return await newUser.save();
}

async function getToken(payload: Partial<User>) {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET as string)
  return token;
}

async function updateUser(userId: string, updatedUser: Partial<User>) {
  const id = new mongoose.Types.ObjectId(userId);
  const result = await UsersRepo.updateOne({ _id: id }, { $set: updatedUser });

  if (!result) {
    return null;
  }
  return await UsersRepo.findById(id);
}

async function deleteUser(userId: string){
  const id = new mongoose.Types.ObjectId(userId);
  return await UsersRepo.findByIdAndDelete(id);
}

export default {
  getAllUsers,
  getUserById,
  getToken,
  createUser,
  updateUser,
  deleteUser
}
