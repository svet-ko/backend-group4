import express from "express"
import { checkAuth as authenticateUser } from "../middlewares/checkAuth.js"
import { checkPermission as authorizePermission } from "../middlewares/checkPermission.js"
import UsersController from "../controllers/usersController.js"

const router = express.Router();
// route for admin only
router.get("/", 
    authenticateUser, 
    authorizePermission, 
    UsersController.getAllUsers
);
// routes for all logged in users
router.get("/:userId", 
    authenticateUser, 
    UsersController.getUserById
);
router.put("/:userId", 
    authenticateUser, 
    UsersController.updateUser
);
router.delete("/:userId", 
    authenticateUser, 
    UsersController.deleteUser
);

export default router;
