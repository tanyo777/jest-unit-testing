import { generateRandomId } from './IdGenerator';

type ObjectWithId = {
  id: string;
};

export class DataBase<T extends ObjectWithId> {
  private elements = new Array<T>();

  public async insert(arg: T) {
    arg.id = generateRandomId();
    this.elements.push(arg);
    return arg.id;
  }

  public async getBy(argName: any, argValue: string) {
    return this.elements.find((x: any) => x[argName] === argValue);
  }

  public async findAllBy(argName: string, argValue: string) {
    return this.elements.filter((x: any) => x[argName] === argValue);
  }

  public async update(id: string, argName: string, argValue: any) {
    const index = this.elements.findIndex((x) => x.id === id);
    (this.elements[index] as any)[argName] = argValue;
  }

  public async delete(id: string) {
    const index = this.elements.findIndex((x) => x.id === id);
    this.elements.splice(index, 1);
  }

  public async getAllElements() {
    return this.elements;
  }
}
