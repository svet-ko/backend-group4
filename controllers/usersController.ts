import { NextFunction, Request, Response } from "express"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import UsersService from "../services/usersService.js"
import { ApiError } from "../errors/ApiError.js"
import { LoginRequest } from "../types/user.js"

async function getAllUsers(_: Request, res: Response) {
  const users = await UsersService.getAllUsers();
  res.json({users});
}

async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const user = await UsersService.getUserById(userId);
  if (!user) {
    next(ApiError.resourceNotFound("User not found."));
    return;
  }
  res.json({ user });
}

async function createUser(req: Request, res: Response) {//req type will change here
  const newUser = req.body;
  const hashedPsw = bcrypt.hash(newUser.password, 10)
  const user = await UsersService.createUser({password: hashedPsw, ...newUser});
  if (!user) {
    //error handling
  }
  const payload = {
    email: user.email,
    password: hashedPsw.toString()
  }
  const token = await UsersService.getToken(payload);
  res.status(201).json({ token })
  // in signup return msg user created insead of user

}
async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loginRequest: LoginRequest = req.body;
  const hashedPsw = loginRequest.password;

  /*
  const user = await UsersRepo.findOne({ email });
  
  if (!user) {
    return "error"
  }
  
  const isValid = bcrypt.compareSync(password, hashedPsw)
   if (!isValid) {
    //return res.json({message: ...})
   }
   */
  const token = await UsersService.getToken(loginRequest);
  if (!token) {
    next(ApiError.unauthorized("Incorrect email or password"));
    return;
  }
  res.status(200).json({ token });
}

async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
  ) {
    const id = req.params.userId;
    const userData = req.body;
    const user = UsersService.getUserById(id);
    if (!user) {
      next(ApiError.resourceNotFound("User not found"));
      return;
    }
    const updatedUser = await UsersService.updateUser(id, userData);
    res.status(200).json({ updatedUser });
}

async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
  ) {
    const id = req.params.userId;
    const user = UsersService.getUserById(id);
    if (user === null) {
      next(ApiError.resourceNotFound("User that you are trying to delete does not exist")); 
      return;
    }
    UsersService.deleteUser(id);
    res.status(204).json({user});
}

export default {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser
}

