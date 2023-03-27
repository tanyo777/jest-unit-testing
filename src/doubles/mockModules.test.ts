// jest.fn() // mock a function
// jest.spyOn() // spy on a function/method
// jest.mock() // mock a whole module

jest.mock('./OtherUtils', () => ({
  ...jest.requireActual('./OtherUtils'),
  toUpperCaseWithId: () => {
    return 'Test';
  }, // change only toUpperCaseWithId function
}));
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
  get: () => {
    return {
      id: 1,
      name: 'Tanyo',
      age: 23,
    };
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

  it('test mocked axios get method', () => {
    const actual = OtherUtils.getUser();
    expect(actual).toHaveProperty('name', 'Tanyo');
  });
});
