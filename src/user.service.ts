export interface IUser {
  id: number;
  name: string;
  age: number;
}

export default class UserService {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  addUser(user: IUser) {
    this.users.push(user);
    return user;
  }

  removeUser(id: number) {
    this.users = this.users.filter((user: IUser) => user.id !== id);
  }

  findById(id: number) {
    const user = this.users.find((user: IUser) => user.id === id);

    if (!user) {
      throw Error(`Cannot find user with id: ${id}!`);
    }

    return user;
  }

  returnUsers(): IUser[] {
    return this.users;
  }
}
