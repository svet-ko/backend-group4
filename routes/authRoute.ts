import express from "express"
import UsersController from "../controllers/usersController.js"
import { validateLoginRequest } from "../middlewares/validateLoginRequest.js"
import { validateNewUserRequest } from "../middlewares/validateNewUserRequest.js";

const router = express.Router()

router.post("/signup", validateNewUserRequest, UsersController.createUser);
router.post("/login", validateLoginRequest, UsersController.login)

export default router;