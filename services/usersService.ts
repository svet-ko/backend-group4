import { UsersRepo } from "../models/User.js";
import { LoginRequest, User, UserDTO } from "../types/user.js";
import { generateId } from "../utils/generateId.js";

const usersRepo = new UsersRepo();

function getAllUsers(): User[] {
  const users = usersRepo.getAllUsers();
  return users;
}

function getUserById(userId: number): User | undefined {
  const user = usersRepo.getUserById(userId);
  return user;
}

function handleLogin(loginRequest: LoginRequest) {
    const isUser = usersRepo.checkUserByEmailAndPassword(loginRequest.password, loginRequest.email);
    if (!isUser) {
        return null;
    }
    return usersRepo.getUserByEmailAndPassword(loginRequest);
}

function createUser(user: UserDTO): User | null {
    const isUser = usersRepo.checkUserByEmailAndPassword(user.name, user.email);
    if (isUser) {
        return null;
    } 
    const users = usersRepo.getAllUsers()
    const id = generateId(users);
    const userData = {id, ...user}; 
    const newUser = usersRepo.createUser(userData);
    return newUser;
}

function updateUser(id: number, user: Partial<User>) {
    return usersRepo.updateUser(id, user);
};

function deleteUser(id: number){
    return usersRepo.deleteUser(id);
};

export default {
    getAllUsers,
    getUserById,
    handleLogin,
    createUser,
    updateUser,
    deleteUser
};
