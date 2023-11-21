import express from "express"
import UsersController from "../controllers/usersController"
import { validateLoginRequest } from "../middlewares/validateLoginRequest"
import { validateNewUserRequest } from "../middlewares/validateNewUserRequest"
import { checkAuth as authenticateLoginRequest } from "../middlewares/checkAuth"

const router = express.Router();

router.post(
    "/signup", 
    validateNewUserRequest, 
    UsersController.createUser
);
router.post(
    "/login", 
    validateLoginRequest, 
    authenticateLoginRequest, 
    UsersController.login
);

export default router;