import UserService, { IUser } from './user.service';

describe('Test user service', () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  it('should test addUser method', () => {
    const user: IUser = {
      id: 1,
      name: 'Tanyo',
      age: 23,
    };

    const createdUser = userService.addUser(user);

    expect(typeof createdUser.age).toBe('number');
    expect(typeof createdUser.name).toBe('string');
    expect(typeof createdUser.id).toBe('number');

    expect(createdUser.id).toBe(1);
    expect(createdUser.name).toBe('Tanyo');
    expect(createdUser.age).toBe(23);
  });

  it('should test returnUsers method', () => {
    const users = userService.returnUsers();

    expect(users).toHaveLength(1);
  });

  it('should find user by id by giving correct id', () => {
    const user = userService.findById(1);

    expect(user).toBeDefined();
  });

  it('should find user by id by giving non existing id', () => {
    // testing for errors
    try {
      userService.findById(8593185931);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty(
        'message',
        'Cannot find user with id: 8593185931!'
      );
    }
  });

  it.todo('test something next week');

  it('should test removeUser method', () => {
    userService.removeUser(1);

    // testing for errors
    try {
      userService.findById(1);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'Cannot find user with id: 1!');
    }
  });
});
