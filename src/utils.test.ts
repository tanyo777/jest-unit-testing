import Utils, { stringInfo } from './utils';

describe('test utils functions', () => {
  // Parametrized Test
  it.each([
    { input: 'abc', expected: 'ABC' },
    { input: 'test', expected: 'TEST' },
  ])('parametrized test for the toUpperCase method($input, $expected)', ({ input, expected }) => {
    const utils = new Utils();

    const actual = utils.toUpperCase(input);

    expect(actual).toBe(expected);
  });

  it('should test getStringInfo method', () => {
    const utils = new Utils();
    const expected: stringInfo = {
      lowerCase: 'test',
      upperCase: 'TEST',
      characters: ['t', 'e', 's', 't'],
      length: 4,
    };

    const actual = utils.getStringInfo('test');

    expect(actual).toEqual<stringInfo>(expected);
  });
});
