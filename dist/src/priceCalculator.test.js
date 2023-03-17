"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const priceCalculator_1 = __importDefault(require("./priceCalculator"));
describe('test the price calculator', () => {
    let priceCalculator;
    beforeAll(() => {
        return priceCalculator = new priceCalculator_1.default(100);
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
