"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriceCalculator {
    constructor(basePrice) {
        this.basePrice = basePrice;
    }
    getTotal() {
        return this.basePrice - this.shippingFee();
    }
    shippingFee() {
        // the free is 20% of the baseprice 
        return this.basePrice * (20 / 100);
    }
}
exports.default = PriceCalculator;
