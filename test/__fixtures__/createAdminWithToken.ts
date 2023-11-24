import users from "./users";
import usersService from "../../services/usersService";
import {User} from "../../types/user";

export async function createAdminWithToken() {
  const adminData: any = users[0];
  const user = await usersService.createUser(adminData as User);

  adminData.id = user._id.toString();

  const token = await usersService.getToken(adminData);

  return token;
}