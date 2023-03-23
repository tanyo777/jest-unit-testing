import { sum } from './sum';

describe('test sum function', () => {
  it('should add 2 numbers of type number', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
