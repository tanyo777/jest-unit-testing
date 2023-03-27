// jest.fn() // mock a function
// jest.spyOn() // spy on a function/method
// jest.mock() // mock a whole module

jest.mock('./OtherUtils', () => ({
  ...jest.requireActual('./OtherUtils'),
  toUpperCaseWithId: () => {
    return 'Test';
  }, // change only toUpperCaseWithId function
}));
import { IUser } from './orm';
// all method within the OtherUtils.ts are empty
// So we must create a mocked versions of them

import * as OtherUtils from './OtherUtils';

// mock uuid v4 method
jest.mock('uuid', () => ({
  v4: () => {
    return '123';
  },
}));

// mock axios get method
jest.mock('axios', () => ({
  get: async (): Promise<IUser> => {
    const user = await Promise.resolve({
      id: 1,
      name: 'Tanyo',
      email: 'tanyo.nikolov00@gmail.com',
      age: 23,
      createdAt: '2023-03-27T11:00:30.851Z',
    });
    return user;
  },
}));

describe('mocked modules tests', () => {
  it('should test toUpperCaseWithId', () => {
    const actual = OtherUtils.toUpperCaseWithId('test');
    expect(actual).toBe('Test');
  });

  it('should test toLowerCaseWithId', () => {
    const actual = OtherUtils.toLowerCaseWithId('test');
    expect(actual).toBeDefined();
  });

  it('test toLoweCaseWithId with mocked uuid v4 method', () => {
    const actual = OtherUtils.toLowerCaseWithId('TEST');
    expect(actual).toBe('test123');
  });

  it('test mocked axios get method', async () => {
    const actual = await OtherUtils.getUser();
    expect(actual).toHaveProperty('id', 1);
    expect(actual).toHaveProperty('name', 'Tanyo');
    expect(actual).toHaveProperty('email', 'tanyo.nikolov00@gmail.com');
    expect(actual).toHaveProperty('age', 23);
    expect(actual).toHaveProperty('createdAt', '2023-03-27T11:00:30.851Z');
  });
});
