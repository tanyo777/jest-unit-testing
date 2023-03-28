import { UserCredentialsDataAccess } from './UserCredentialsDataAccess';
import { DataBase } from './DataBase';
import { Account } from '../model/AuthModel';

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('./DataBase', () => {
  return {
    DataBase: jest.fn(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe('Test the UserCredentialsDataAccess class', () => {
  let sut: UserCredentialsDataAccess;

  const account: Account = {
    id: '12345',
    userName: 'tanyo',
    password: 'Test@123',
  };

  const id = '12345';

  const userName = 'tanyo';

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test addUser method', async () => {
    insertMock.mockResolvedValueOnce(id);

    const actualId = await sut.addUser(account);

    expect(actualId).toBe(id);

    expect(insertMock).toBeCalledWith(account);
    expect(insertMock).toBeCalledTimes(1);
  });

  it('should test getUserById method', async () => {
    getByMock.mockResolvedValueOnce(account);

    const user = await sut.getUserById(id);

    expect(user).toEqual(account);

    expect(getByMock).toBeCalledWith('id', id);
    expect(getByMock).toBeCalledTimes(1);
  });

  it('should test getUserByUserName method', async () => {
    getByMock.mockResolvedValueOnce(account);

    const user = await sut.getUserByUserName(userName);

    expect(user).toEqual(account);

    expect(getByMock).toBeCalledWith('userName', userName);
    expect(getByMock).toBeCalledTimes(1);
  });
});
