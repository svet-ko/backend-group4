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
//const key = crypto.randomBytes(64).toString("hex"); //put token as TOKEN_SECRET in .env
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
  //-------------
  /*const payload = {
    userId: user.id,
    email: user.email
  }
  const token = jwt.sign(payload, process.env.TOKEN_SECRET as string)
  res.json({token}) // to test token use jwt.io*/
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

/*
protected route principle example
app.get("/protected", (req, res) =>{
  //- before moving forward, check token
  // in get request in Authorization in postman, choose from dropdown bearer token - paste token
  // 
  const token = req.headers.authorization.split(" ")[1] //splitting token from the word Bearer
  try {
    // this is token vaidation
    const decoded = jwt.verify(token, process.env.TOEKN_STRING as string)
    console.log(decoded) // if decoded comes it means its valid
    next(null, userId) // we sending iether userId or the whole decoded user
    // usually next steps are checking user roles/permissions
    res.json({ some content ...})
  } catch (err){
    console.log(err)
    res.status(403).json({ message: "invalid token"})
  }
}
// this validation will move to middleware 
*/

