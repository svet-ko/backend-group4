import { LoginRequest, User } from "../types/user.js"

export class UsersRepo {
  users: User[] = [
    {
        id: 1,
        name: "Ieva",
        role: "admin",
        email: "ieva@email.com",
        password: "admin123",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867"
    },
    {
        id: 2,
        name: "User",
        role: "customer",
        email: "user@email.com",
        password: "123123",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867"
    }  
  ]
  
  getAllUsers() {
    return this.users
  }

  getUserById(userId: number) {
    const user = this.users.find((user) => user.id === userId)
    return user;
  }

  checkUserByEmailAndPassword(password: string, email: string){
    return this.users.some(user => user.password === password && user.email === email);
  }

  getUserByEmailAndPassword(loginRequest: LoginRequest) {
    return this.users.find(user => user.password === loginRequest.password && user.email === loginRequest.email);
  }
  
  createUser(newUser: User) {
    this.users = [...this.users, newUser];
    return newUser;
  }

  updateUser(id: number, userUpdates: Partial<User>){
      let updatedUser = undefined;
      const updatedUsers = this.users.map((user) => {
        if (user.id === id) {
          updatedUser = {
            ...user,
            ...userUpdates
          }
          return updatedUser;
        }
        return user;
      });
  
      this.users = updatedUsers;
      return updatedUsers;
  }

  deleteUser(id: number){
    const user = this.users.find(user => user.id === id);
    const index = this.users.findIndex((user) => user.id === id);
    if (!user) {
      return
    }
    this.users.splice(index, 1);
    return user;
  }

}
