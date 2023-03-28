import { IncomingMessage, ServerResponse } from 'http';
import { Authorizer } from '../auth/Authorizer';
import { Account } from '../model/AuthModel';
import { HTTP_CODES, HTTP_METHODS } from '../model/ServerModel';
import { getRequestBody } from '../utils/Utils';
import { LoginHandler } from './LoginHandler';

const getRequestBodyMock = jest.fn();
jest.mock('../utils/Utils', () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

describe('Test LoginHandler class', () => {
  let sut: LoginHandler;

  const request = {
    method: HTTP_METHODS.POST,
  };

  const responseMock = {
    write: jest.fn(),
    writeHead: jest.fn(),
    statusCode: 0,
  };

  const authorizerMock = {
    login: jest.fn(),
  };

  const account: Account = {
    id: '',
    userName: 'tanyo',
    password: 'Test@123',
  };

  const tokenId = '12345';

  beforeEach(() => {
    sut = new LoginHandler(
      request as any as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test handleRequest with correct username and password', async () => {
    getRequestBodyMock.mockResolvedValueOnce(account);
    authorizerMock.login.mockResolvedValueOnce(tokenId);

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.write).toBeCalledWith(
      JSON.stringify({ token: tokenId })
    );
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, {
      'Content-Type': 'application/json',
    });
  });

  it('should test handleRequest with no token provided', async () => {
    getRequestBodyMock.mockResolvedValueOnce(account);
    authorizerMock.login.mockResolvedValue(undefined);

    await sut.handleRequest();
    expect(responseMock.write).toBeCalledWith(
      JSON.stringify('wrong username or password')
    );
    expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
  });

  it('should test handleRequest with incorrect username and password', async () => {
    getRequestBodyMock.mockResolvedValueOnce({});
    authorizerMock.login.mockResolvedValueOnce(tokenId);

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseMock.write).toBeCalledWith(
      JSON.stringify('userName and password required')
    );
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.BAD_REQUEST, {
      'Content-Type': 'application/json',
    });
  });

  it('should test handleRequest with unsupported http method', async () => {
    request.method = HTTP_METHODS.GET;

    await sut.handleRequest();

    expect(responseMock.write).not.toBeCalled();
    expect(responseMock.writeHead).not.toBeCalled();
    expect(getRequestBodyMock).not.toBeCalled();
  });
});
