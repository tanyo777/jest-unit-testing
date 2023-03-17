"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const person_1 = __importDefault(require("./person"));
describe("test person class", () => {
    let person;
    beforeAll(() => {
        person = new person_1.default("Tanyo", 23);
    });
    it("should test the object contains name and age property", () => {
        expect(person).toBeInstanceOf(person_1.default);
        expect(person.name).toBeTruthy();
        expect(person.age).toBeTruthy();
        expect(typeof person.name).toEqual("string");
        expect(typeof person.age).toEqual("number");
    });
    it("should test the get info method", () => {
        const personInfo = person.getInfo();
        expect(personInfo).toEqual("Hello, my name is Tanyo and im 23 years old!");
    });
});
