"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getInfo() {
        return `Hello, my name is ${this.name} and im ${this.age} years old!`;
    }
}
exports.default = Person;
