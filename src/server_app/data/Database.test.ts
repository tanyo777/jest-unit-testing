import { DataBase } from './DataBase';
import * as IdGenerator from './IdGenerator';

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe('Test DataBase class', () => {
  let sut: DataBase<someTypeWithId>;

  const fakeId = '12345';

  const object1 = { id: '3', color: 'red', name: 'Tanyo' };

  const object2 = { id: '3', color: 'red', name: 'Ivan' };

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
  });

  it('should test insert method', async () => {
    const id = await sut.insert(object1);

    expect(id).toBe('12345');
  });

  it('should test getBy method', async () => {
    const id = await sut.insert(object1);
    const actual = await sut.getBy('id', id);

    expect(actual).toEqual(object1);
  });

  it('should test findAllBy method', async () => {
    await sut.insert(object1);
    await sut.insert(object2);

    const expected = [object1, object2];
    const actual = await sut.findAllBy('color', 'red');

    expect(actual).toHaveLength(2);
    expect(actual).toEqual(expected);
  });

  it('should test update method', async () => {
    const id = await sut.insert(object1);

    await sut.update(id, 'color', 'blue');
    const actual = await sut.getBy('id', id);

    expect(actual).toHaveProperty('color', 'blue');
  });

  it('should test delete method', async () => {
    const id = await sut.insert(object1);

    await sut.delete(id);

    const actual = await sut.getBy('id', id);

    expect(actual).toBeUndefined();
  });

  it('should test getAllElements method', async () => {
    await sut.insert(object1);
    await sut.insert(object2);

    const expected = [object1, object2];

    const actual = await sut.getAllElements();

    expect(actual).toEqual(expected);
  });
});
