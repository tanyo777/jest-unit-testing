export interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: string;
}

export const getUser = jest.fn((id: number): IUser => {
  return {
    id,
    name: 'Tanyo',
    email: 'tanyo.nikolov00@gmail.com',
    age: 23,
    createdAt: '2023-03-27T11:00:30.851Z',
  };
});

export default class UserService {
  //   getUser(): IUser {}
}
