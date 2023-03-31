class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @logMethodCall
  getName(argument?: string): string {
    return this.name;
  }
}

class Teacher {
  dimploma: string;

  constructor(public name: string, diploma: string) {
    this.name = name;
    this.dimploma = diploma;
  }

  @logMethodCall
  getName(argument?: string): string {
    return this.name;
  }
}

const person = new Person('Tanyo');
const teacher = new Teacher('Ivan', 'Teaching');

console.log(person.getName('djsaidas'));
console.log(teacher.getName('jdisajdasi'));

function logMethodCall(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const className = target.constructor.name;
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(
      `Class ${className} called ${propertyKey} with arguments: ${JSON.stringify(
        args
      )}`
    );

    const result = originalMethod.apply(this, args);
    return result;
  };
}
