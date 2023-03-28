import { generateRandomId } from './IdGenerator';

jest.mock('crypto', () => {
  return {
    randomBytes: jest.fn(() => {
      return {
        toString: jest.fn(() => '12345'),
      };
    }),
  };
});

describe('Test IdGenerator function', () => {
  it('should generate random id', () => {
    const id = generateRandomId();

    expect(id).toBe('12345');
  });
});
