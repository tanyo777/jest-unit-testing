"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum_1 = require("./sum");
describe('test sum function', () => {
    it('should add 2 numbers of type number', () => {
        expect((0, sum_1.sum)(1, 2)).toEqual(3);
    });
});
