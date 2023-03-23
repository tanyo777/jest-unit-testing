export default class PriceCalculator {
  basePrice: number;

  constructor(basePrice: number) {
    this.basePrice = basePrice;
  }

  getTotal(): number {
    return this.basePrice - this.shippingFee();
  }

  shippingFee(): number {
    // the free is 20% of the baseprice
    return this.basePrice * (20 / 100);
  }
}
