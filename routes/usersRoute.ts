import express from "express"
import UsersController from "../controllers/usersController.js"

const router = express.Router();

router.get("/", UsersController.getAllUsers);
router.get("/:userId", UsersController.getUserById);
router.put("/:userId", UsersController.updateUser);
router.delete("/:userId", UsersController.deleteUser);

export default router;
