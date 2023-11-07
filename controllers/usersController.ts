import { NextFunction, Request, Response } from "express"

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

async function createUser(req: Request, res: Response) {
  const newUser = req.body;
  const user = await UsersService.createUser(newUser);
  res.status(201).json({ user });
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loginRequest: LoginRequest = req.body;
  const user = await UsersService.handleLogin(loginRequest);
  if (!user) {
    next(ApiError.unauthorized("Incorrect email or password"));
    return;
  }
  res.status(200).json({ user });
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
    const result = await UsersService.updateUser(id, userData);
    res.status(200).json({ result });
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
    res.status(200).json({user});
}

export default {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser
}

