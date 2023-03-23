import Person from './person';

describe('test person class', () => {
  let person: Person;

  beforeAll(() => {
    person = new Person('Tanyo', 23);
  });

  it('should test the object contains name and age property', () => {
    expect(person).toBeInstanceOf(Person);
    expect(person.name).toBeTruthy();
    expect(person.age).toBeTruthy();
    expect(typeof person.name).toEqual('string');
    expect(typeof person.age).toEqual('number');
  });

  it('should test the get info method', () => {
    const personInfo = person.getInfo();
    expect(personInfo).toEqual('Hello, my name is Tanyo and im 23 years old!');
  });
});
