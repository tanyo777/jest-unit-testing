import { SessionTokenDataAccess } from './SessionTokenDataAccess';
import { DataBase } from './DataBase';
import { Account } from '../model/AuthModel';

const insertMock = jest.fn();
const updateMock = jest.fn();
const getByMock = jest.fn();

// mock database service
jest.mock('./DataBase', () => {
  return {
    DataBase: jest.fn(() => {
      return {
        insert: insertMock,
        update: updateMock,
        getBy: getByMock,
      };
    }),
  };
});

describe('Test SessionTokenDataAccess class', () => {
  let sut: SessionTokenDataAccess;

  const account: Account = {
    id: '12345',
    userName: 'tanyo',
    password: 'Test@123',
  };

  const tokenId = '12345';

  beforeEach(() => {
    sut = new SessionTokenDataAccess();
    // expect(DataBase).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test generateToken method', async () => {
    insertMock.mockResolvedValueOnce(tokenId);

    const insertPayload = {
      id: '',
      userName: account.userName,
      valid: true,
      expirationDate: (sut as any).generateExpirationTime(),
    };

    const actual = await sut.generateToken(account);

    expect(actual).toBe(tokenId);

    expect(insertMock).toBeCalledWith(insertPayload);
  });

  it('should test invalidateToken method', async () => {
    // generate token
    insertMock.mockResolvedValueOnce(tokenId);
    await sut.generateToken(account);

    const payload = {
      id: '',
      userName: account.userName,
      valid: false,
      expirationDate: (sut as any).generateExpirationTime(),
    };

    updateMock.mockImplementationOnce(() => {
      payload.valid = false;
    });

    await sut.invalidateToken(tokenId);

    expect(payload.valid).toBe(false);
  });

  it('should test isValidToken method return true', async () => {
    insertMock.mockResolvedValueOnce(tokenId);
    const sessionToken = {
      id: '',
      userName: account.userName,
      valid: true,
      expirationDate: (sut as any).generateExpirationTime(),
    };
    getByMock.mockResolvedValueOnce(sessionToken);

    await sut.generateToken(account);

    const actual = await sut.isValidToken(tokenId);

    expect(actual).toBe(true);
  });

  it('should test isValidToken method return false', async () => {
    insertMock.mockResolvedValueOnce(tokenId);
    getByMock.mockResolvedValueOnce(undefined);

    await sut.generateToken(account);

    const actual = await sut.isValidToken(tokenId);

    expect(actual).toBe(false);
  });

  it('should test generateExpirationTime method', () => {
    jest
      .spyOn(sut as any, 'generateExpirationTime')
      .mockImplementationOnce(() => {
        return new Date('2022-03-25');
      });

    const actual = (sut as any).generateExpirationTime();
    expect(actual).toEqual(new Date('2022-03-25'));
  });
});
