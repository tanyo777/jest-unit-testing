import { IncomingMessage, ServerResponse } from 'http';
import { Authorizer } from '../auth/Authorizer';
import { Account } from '../model/AuthModel';
import { HTTP_CODES, HTTP_METHODS } from '../model/ServerModel';
import { RegisterHandler } from './RegisterHandler';

const getRequestBodyMock = jest.fn();

jest.mock('../utils/Utils', () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

describe('Test RegisterHandler', () => {
  let sut: RegisterHandler;

  const request = {
    method: HTTP_METHODS.POST,
    body: {
      username: '',
      password: '',
    },
  };

  const responseMock = {
    writeHead: jest.fn(),
    write: jest.fn(),
    statusCode: 0,
  };

  const authorizerMock = {
    registerUser: jest.fn(),
  };

  const account: Account = {
    id: '',
    userName: 'tanyo',
    password: 'Test@123',
  };

  const accountId = '12345';

  beforeEach(() => {
    sut = new RegisterHandler(
      request as any as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test handleRequest with username and password', async () => {
    getRequestBodyMock.mockResolvedValueOnce(account);
    authorizerMock.registerUser.mockResolvedValueOnce(accountId);

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, {
      'Content-Type': 'application/json',
    });

    expect(responseMock.write).toBeCalledWith(
      JSON.stringify({ userId: accountId })
    );
  });

  it('should test handleRequest without username and password', async () => {
    getRequestBodyMock.mockResolvedValueOnce({});
    authorizerMock.registerUser.mockResolvedValueOnce(accountId);

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.BAD_REQUEST, {
      'Content-Type': 'application/json',
    });

    expect(responseMock.write).toBeCalledWith(
      JSON.stringify('userName and password required')
    );
  });

  it('should test handleRequest with not supported http methods', async () => {
    request.method = HTTP_METHODS.GET;

    await sut.handleRequest();

    expect(responseMock.writeHead).not.toBeCalled();
    expect(responseMock.write).not.toBeCalled();
    expect(getRequestBodyMock).not.toBeCalled();
  });
});
