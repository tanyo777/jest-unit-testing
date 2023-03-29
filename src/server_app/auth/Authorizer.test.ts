import { SessionTokenDataAccess } from '../data/SessionTokenDataAccess';
import { UserCredentialsDataAccess } from '../data/UserCredentialsDataAccess';
import { Authorizer } from './Authorizer';

const generateTokenMock = jest.fn();
const isValidTokenMock = jest.fn();
const invalidateTokenMock = jest.fn();

jest.mock('../data/SessionTokenDataAccess', () => {
  return {
    SessionTokenDataAccess: jest.fn().mockImplementation(() => {
      return {
        generateToken: generateTokenMock,
        isValidToken: isValidTokenMock,
        invalidateToken: invalidateTokenMock,
      };
    }),
  };
});

const getUserByUserNameMock = jest.fn();
const addUserMock = jest.fn();

jest.mock('../data/UserCredentialsDataAccess', () => {
  return {
    UserCredentialsDataAccess: jest.fn(() => {
      return {
        getUserByUserName: getUserByUserNameMock,
        addUser: addUserMock,
      };
    }),
  };
});

describe('Test the Authorizer class', () => {
  let sut: Authorizer;

  const tokenId = '12345';

  beforeEach(() => {
    sut = new Authorizer();
    expect(SessionTokenDataAccess).toBeCalledTimes(1);
    expect(UserCredentialsDataAccess).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test validateToken method', async () => {
    isValidTokenMock.mockResolvedValueOnce(true);
    const actual = await sut.validateToken(tokenId);

    expect(actual).toBe(true);
  });

  it('should test registerUser method', async () => {
    const account = {
      id: '',
      userName: 'tanyo',
      password: 'Test@123',
    };

    addUserMock.mockResolvedValueOnce('testUserId');
    const actual = await sut.registerUser(account.userName, account.password);

    expect(actual).toBe('testUserId');
    expect(addUserMock).toBeCalledWith(account);
    expect(addUserMock).toBeCalledTimes(1);
  });

  it('should test login method', async () => {
    const account = {
      id: '',
      userName: 'tanyo',
      password: 'Test@123',
    };

    getUserByUserNameMock.mockResolvedValueOnce(account);
    generateTokenMock.mockResolvedValueOnce(tokenId);
    const actual = await sut.login(account.userName, account.password);

    expect(actual).toBe(tokenId);
    expect(generateTokenMock).toBeCalledWith(account);
  });

  it('should test logout method', async () => {
    await sut.logout(tokenId);

    expect(invalidateTokenMock).toBeCalledWith(tokenId);
  });

  it('should return undefined for invalid credentials', async () => {
    getUserByUserNameMock.mockResolvedValueOnce({
      password: 'Test@123',
    });

    const actual = await sut.login('tanyo', 'tanyo123');

    expect(actual).toBeUndefined();
  });
});
