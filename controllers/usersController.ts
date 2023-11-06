import { NextFunction, Request, Response } from "express"

import UsersService from "../services/usersService.js"
import { ApiError } from "../errors/ApiError.js"
import { ObjectId } from "mongoose"

export async function getAllUsers(_: Request, res: Response) {
  const products = await UsersService.getAllUsers()

  res.json({ products })
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId
  const user = await UsersService.getUserById(userId)
  if (!user) {
    next(ApiError.resourceNotFound("User not found."))
    return
  }
  res.json({ user })
}

export async function createUser(req: Request, res: Response) {
  const newUser = req.body
  const user = await UsersService.createUser(newUser)
  res.status(201).json({ user })
}

export default {
  getAllUsers,
  getUserById,
  //login,
  createUser,
  //updateUser,
  //deleteUser
};


/*import { NextFunction, Request, Response } from "express";
import UserService from "../services/usersService.js";
import { ApiError } from "../errors/ApiError.js";

function getAllUsers(
  _: Request, 
  res: Response, 
  next: NextFunction
) {
  const users = UserService.getAllUsers();
  res.json({ users });
}

function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const user = UserService.getUserById(userId);
  if (!user) {
    next(ApiError.resourceNotFound("User not found"));
    return;
  }
  res.json({ user });
}

function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loginRequest = req.body;
  const user = UserService.handleLogin(loginRequest);
  if (!user) {
    next(ApiError.unauthorized("Incorrect email or password"));
    return;
  }
  res.status(201).json({ user });
}

function createUser(
  req: Request, 
  res: Response,
  next: NextFunction) {
  const newUser = req.body;
  const user = UserService.createUser(newUser);
  if (!user) {
    next(ApiError.badRequest("This user is already in the system"));
    return;
  }
  res.status(201).json({ user }); 
}

function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
  ) {
      const id = Number(req.params.userId);
      const userData = req.body;
      const user = UserService.getUserById(id);
      if (!user) {
        next(ApiError.resourceNotFound("User not found"));
        return;
      }
      UserService.updateUser(id, userData);
      res.status(200).json(userData);
}

function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
  ) {
      const id = Number(req.params.userId);
      const user = UserService.getUserById(id);
      if (!user) {
        next(ApiError.resourceNotFound("User that you are trying to delete does not exist")); 
        return;
      }
      UserService.deleteUser(id);
      res.status(200).json(user);
    }

export default {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser
};*/
