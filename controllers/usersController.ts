import { NextFunction, Request, Response } from "express"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import UsersRepo from "../models/User.js"
import UsersService from "../services/usersService.js"
import { ApiError } from "../errors/ApiError.js"
import { LoginRequest } from "../types/auth.js"
import { TokenPayload, User} from "../types/user.js"

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

async function createUser(req: Request, res: Response, next: NextFunction) {
  const newUser = req.body;
  const user = await UsersService.createUser(newUser);
  console.log("user with hashed psw? ", user);
  if (!user) {
    next(ApiError.internal("User could not be created"));
    return;
  }
  const payload: TokenPayload = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: !user.role ? "CUSTOMER" : "ADMIN",
    avatar: !user.avatar ? "https://api.lorem.space/image/face?w=640&h=480&r=867" : user.avatar
  }
  const token = await UsersService.getToken(payload);
  res.status(201).json({ token })
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loginRequest: LoginRequest = req.body;
  const hashedPsw = await bcrypt.hash(loginRequest.password, 10);
  //const password = hashedPsw.toString();
  const user = await UsersRepo.findOne({ email: loginRequest.email });
  if (!user) {
    return res.json({message: "Not in the system, please signup first"});
  }
  const isValid = bcrypt.compareSync(hashedPsw, user.password);
  if (!isValid) {
    return res.json({message: "Invalid password"});
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

