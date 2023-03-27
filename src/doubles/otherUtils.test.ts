import { stringInfo } from '../utils';
import { calculateComplexity } from './OtherUtils';

describe('test OtherUtils functions', () => {
  it('should calculateComplexity function', () => {
    // stub
    const someInfo = {
      length: 5,
      characters: ['t', 'e', 's', 't'],
    };

    const actual = calculateComplexity(someInfo as stringInfo);

    expect(actual).toBe(20);
  });
});
