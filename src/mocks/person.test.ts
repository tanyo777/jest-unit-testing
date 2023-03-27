import Person from './Person';

describe('test Person class', () => {
  let person: Person;
  let personMock: jest.SpyInstance;
  let personMock2: jest.Mock;

  beforeEach(() => {
    person = new Person();

    // mocking with jest.spyOn()
    personMock = jest
      .spyOn(person, 'displayHobbies')
      .mockImplementation(() => ['Swimming', 'Boxing', 'Skating']);

    //   mocking with jest.fn()
    personMock2 = jest.fn(() => ['Swimming', 'Boxing', 'Skating']);
  });

  afterEach(() => {
    personMock.mockClear();
    personMock2.mockClear();
  });

  it('should test displayHobbies with jest.fn', () => {
    const hobbies = personMock2();
    expect(hobbies).toContain('Boxing');
    expect(hobbies).toContain('Skating');
    expect(hobbies).toContain('Swimming');
  });

  it('should test addName method', () => {
    const hobbies = person.displayHobbies();

    expect(hobbies).toContain('Boxing');
    expect(hobbies).toContain('Skating');
    expect(hobbies).toContain('Swimming');
  });

  it('should test mock clear', () => {
    const hobbies = person.displayHobbies();
    expect(hobbies).toContain('Boxing');
    expect(hobbies).toContain('Skating');
    expect(hobbies).toContain('Swimming');
    expect(personMock).toBeCalledTimes(1);
  });
});
