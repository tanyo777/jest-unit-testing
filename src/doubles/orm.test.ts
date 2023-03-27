import { IUser } from './orm';
import { getUser } from './orm';

describe('test user service', () => {
  let user: IUser;

  beforeEach(() => {
    user = getUser(1);
  });

  afterEach(() => {
    // clear the mock
    getUser.mockClear();
  });

  it('should test getUser', () => {
    expect(getUser.mock.calls).toHaveLength(1);
    // console.log(getUser.mock.lastCall); // returns the arguments for the last call that was made to the mocked function
    expect(user.age).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.createdAt).toBeDefined();

    expect(typeof user.age).toBe('number');
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.createdAt).toBe('string');

    expect(user.age).toBe(23);
    expect(user.id).toBe(1);
    expect(user.name).toBe('Tanyo');
    expect(user.email).toBe('tanyo.nikolov00@gmail.com');
    expect(user.createdAt).toEqual('2023-03-27T11:00:30.851Z');
  });

  it('should test mock calls', () => {
    expect(getUser.mock.calls).toHaveLength(1);
    expect(getUser).toBeCalledTimes(1);
  });
});
