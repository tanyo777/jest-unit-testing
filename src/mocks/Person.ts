interface IPerson {
  addName: (name: string) => void;
  addAge: (age: number) => void;
  addHobby: (hobby: string) => void;
  displayHobbies: () => string[];
}

export default class Person implements IPerson {
  private name!: string;
  private age!: number;
  private hobbies: string[] = [];

  constructor() {
    this.hobbies = [];
  }

  addName(name: string) {
    this.name = name;
  }

  addAge(age: number) {
    this.age = age;
  }

  addHobby(hobby: string) {
    this.hobbies.push(hobby);
  }

  displayHobbies(): string[] {
    return this.hobbies;
  }
}
