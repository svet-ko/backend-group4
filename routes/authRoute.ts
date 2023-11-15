import express from "express"
import UsersController from "../controllers/usersController.js"
import { validateLoginRequest } from "../middlewares/validateLoginRequest.js"
import { validateNewUserRequest } from "../middlewares/validateNewUserRequest.js"
import { checkAuth as authenticateLoginRequest } from "../middlewares/checkAuth.js"

const router = express.Router();

router.post("/signup", validateNewUserRequest, UsersController.createUser);
router.post(
    "/login", 
    validateLoginRequest, 
    authenticateLoginRequest, 
    UsersController.login
);

export default router;