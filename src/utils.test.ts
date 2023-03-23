import Utils, { stringInfo } from './utils';

describe('test utils functions', () => {
  it('should test toUpperCase method', () => {
    const utils = new Utils();
    const expected = 'TEST';

    const actual = utils.toUpperCase('test');

    expect(actual).toEqual(expected);
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
