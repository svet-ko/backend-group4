import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

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

router.post(
    "/login-google",
    passport.authenticate("google-id-token", { session: false }),
    (req: any, res) => {
      const user = req.user
  
      if (user) {
        const payload = {
          userId: user._id,
          email: user.email,
          role: user.role,
        }
        const accessToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET as string,
          {
            expiresIn: "1h",
          }
        )
        res.json({
          accessToken,
        })
      }
    }
  )

export default router;