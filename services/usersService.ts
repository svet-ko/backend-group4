import mongoose from "mongoose"
import UsersRepo from "../models/User.js"
import { LoginRequest, User } from "../types/user.js"

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

async function handleLogin(loginRequest: LoginRequest) {
  const { email, password } = loginRequest;
  const user = await UsersRepo.findOne({ email, password});
  /**
   * in schema make fields required!!
   const password , email from req.body
   const user = await Userrepo.findOne({email})
   if (!user) {
    return res.json({message: ...})
   }
   const hashedPsw = user.password
   const isValid = bcrypt.compareSync(password, hashedPsw)
   if (!isValid) {
    return res.json({message: ...})
   }
   login returns token that we create after checking isValid
   *
   //we need to build middleware for authorization, where we extract the information thru token to make use of the role
  return user;
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
  handleLogin,
  createUser,
  updateUser,
  deleteUser
}
