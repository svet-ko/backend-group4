import GoogleTokenStrategy from "passport-google-id-token";
import "dotenv/config";

import UserRepo from "../models/User";
import { ApiError } from "../errors/ApiError";

const GOOGLE_CLIENT_ID =
  "932782294872-0dnbeb01707rug4k607gkfj4n1fv3d88.apps.googleusercontent.com";

export const loginWithGoogle = () => {
  return new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
    },
    async function (parsedToken, googleId, done) {
      const email = parsedToken.payload.email;
      try {
        let user = await UserRepo.findOne({ email });

        if (!user) {
          const newUser = new UserRepo({
            name: parsedToken.payload.name,
            email,
          });

          await newUser.save();
          user = newUser;
        }

        done(false, user);
      } catch (error) {
        return done(ApiError.forbidden("google authentication failed"));
      }
    }
  );
};