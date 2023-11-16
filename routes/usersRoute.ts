import express from "express"
import { checkPermissions as authorizePermissions } from "../middlewares/checkPermissions.js"
import UsersController from "../controllers/usersController.js"

const router = express.Router();

router.get("/", authorizePermissions, UsersController.getAllUsers);
router.get("/:userId", UsersController.getUserById);
router.put("/:userId", UsersController.updateUser);
router.delete("/:userId", UsersController.deleteUser);

export default router;
