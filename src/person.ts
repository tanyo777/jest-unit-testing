export default class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getInfo(): string {
    return `Hello, my name is ${this.name} and im ${this.age} years old!`;
  }
}
