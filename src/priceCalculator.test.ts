import PriceCalculator from "./priceCalculator";


describe('test the price calculator', () => {

    let priceCalculator: PriceCalculator;

    beforeAll(() => {
        return priceCalculator = new PriceCalculator(100);  
    });

    it("should test if the price is a number", () => {
        expect(typeof priceCalculator.basePrice).toEqual("number");
    });

    it("should test the shipping fee method", () => {
        const shippingFee = priceCalculator.shippingFee();
        expect(shippingFee).toEqual(20);
    });

    it("should test the total method", () => {

        // get total method will extract the fee from the price
        const shippingFee = priceCalculator.getTotal();
        expect(shippingFee).toEqual(80);
    });
});