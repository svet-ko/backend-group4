import { NextFunction, Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import UsersRepo from "../models/User"
import UsersService from "../services/usersService"
import { ApiError } from "../errors/ApiError"
import { LoginRequest } from "../../types/auth"
import { TokenPayload } from "../../types/auth"
import usersService from "../services/usersService"

async function getAllUsers(_: Request, res: Response, next: NextFunction) {
  const users = await UsersService.getAllUsers();
  if (!users) {
    next(ApiError.resourceNotFound("No collection"));
    return;
  }
  res.json({ users });
}

async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const user = await UsersService.getUserById(userId);
  if (!user) {
    next(ApiError.resourceNotFound("User not found"));
    return;
  }
  res.json(user);
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  const newUser = req.body;
  const isUser = await UsersRepo.findOne({ email: newUser.email});
  if (isUser) {
    next(ApiError.forbidden("This email address is already in the system"));
    return;
  }
  const user = await UsersService.createUser(newUser);
  if (!user) {
    next(ApiError.internal("User could not be created"));
    return;
  }
  res.status(201).json(user)
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loginRequest: LoginRequest = req.body;
  const user = await UsersRepo.findOne({ email: loginRequest.email });

  if (!user) {
    next(ApiError.resourceNotFound("Not in the system, please signup first"));
    return;
  }

  const isValid = await bcrypt.compare(loginRequest.password, user.password as string);
  
  if (!isValid) {
    next(ApiError.unauthorized("Invalid password"));
    return;
  }
  const payload: TokenPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
  }
  const token = await UsersService.getToken(payload);
  
  if (!token) {
    next(ApiError.internal("Token service failed"));
    return;
  }
  res.status(200).json({ token, user });
}

async function getUserProfile(
  req: any,
  res: Response,
  next: NextFunction
) {
  const userId = req?.decodedUser;
  if (!userId) {
    next(ApiError.unauthorized("Invalid token"));
    return;
  }
  const user = await usersService.getUserById(userId.id);

  if (!user) {
    next(ApiError.resourceNotFound("Not in the system, please signup first"));
    return;
  }

  res.status(200).json(user);
}

async function googleLogin(
  req: any,
  res: Response,
  next: NextFunction
) {
  const user = req.user

  if (user) {
    const payload: TokenPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }

    const token = await UsersService.getToken(payload);
    
    if (!token) {
      next(ApiError.forbidden("Invalid credentials"));
      return;
    }

    res.status(200).json({
      token,
    })
  }
}

async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
  ) {
    const id = req.params.userId;
    const userUpdateData = req.body;
    const user = await UsersService.getUserById(id);
    if (!user) {
      next(ApiError.resourceNotFound("User not found"));
      return;
    }
    if (userUpdateData.password) {
      if (!user.password) {
        next(ApiError.forbidden("You are logged in with google. You don't have password in the system"));
        return;
      }
      const isValid = await bcrypt.compare(userUpdateData.oldPassword, user.password as string);
  
      if (!isValid) {
        next(ApiError.unauthorized("Invalid old password"));
        return;
      }
    }
    const updatedUser = await UsersService.updateUser(id, userUpdateData);
    res.json(updatedUser);
}

async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
  ) {
    const id = req.params.userId;
    const user = await UsersService.getUserById(id);

    if (user === null) {
      next(ApiError.resourceNotFound("User that you are trying to delete does not exist")); 
      return;
    }
    await UsersService.deleteUser(id);
    const deletedUser = await UsersService.getUserById(id);

    if (deletedUser !== null) {
      next(ApiError.internal("Deleting failed")); 
      return;
    }

    res.json({msg: "User was deleted successfuly"});
}

export default {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser,
  googleLogin,
  getUserProfile
}

