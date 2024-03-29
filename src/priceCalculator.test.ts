import PriceCalculator from './priceCalculator';

describe('test the price calculator', () => {
  let priceCalculator: PriceCalculator;

  beforeAll(() => {
    return (priceCalculator = new PriceCalculator(100));
  });

  it('should test if the price is a number', () => {
    expect(typeof priceCalculator.basePrice).toEqual('number');
  });

  it('should test the shipping fee method', () => {
    // Proper unit test structure
    // arrange
    const expected = 20;

    // act
    const actual = priceCalculator.shippingFee();

    // assert
    expect(actual).toEqual(expected);
  });

  it('should test the total method', () => {
    // get total method will extract the fee from the price
    const shippingFee = priceCalculator.getTotal();
    expect(shippingFee).toEqual(80);
  });
});
