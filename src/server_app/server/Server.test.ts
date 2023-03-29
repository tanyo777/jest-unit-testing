import { createServer } from 'http';
import { Server } from './Server';
import { Authorizer } from '../auth/Authorizer';
import { ReservationsDataAccess } from '../data/ReservationsDataAccess';
import { RegisterHandler } from '../handlers/RegisterHandler';
import { LoginHandler } from '../handlers/LoginHandler';
import { ReservationsHandler } from '../handlers/ReservationsHandler';
import { HTTP_CODES } from '../model/ServerModel';

jest.mock('../auth/Authorizer');
jest.mock('../data/ReservationsDataAccess');
jest.mock('../handlers/RegisterHandler');
jest.mock('../handlers/LoginHandler');
jest.mock('../handlers/ReservationsHandler');

// request mock
const requestMock = {
  url: '',
  headers: {
    'user-agent': 'jest-test',
  },
};

// response mock
const endMock = jest.fn();
const writeHeadMock = jest.fn();
const responseMock = {
  end: endMock,
  writeHead: writeHeadMock,
};

// server mock
const listenMock = jest.fn();
const closeMock = jest.fn();

const serverMock = {
  listen: listenMock,
  close: closeMock,
};

// createServer http mock
jest.mock('http', () => ({
  createServer: (cb: Function) => {
    cb(requestMock, responseMock);
    return serverMock;
  },
}));

describe('Test Server.ts', () => {
  let sut: Server;

  beforeEach(() => {
    sut = new Server();
    expect(Authorizer).toBeCalledTimes(1);
    expect(ReservationsDataAccess).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start server on port 8080 and end the request', async () => {
    await sut.startServer();

    expect(serverMock.listen).toBeCalledWith(8080);
    expect(responseMock.end).toBeCalledTimes(1);
  });

  it('should test handleRequest method with register path', async () => {
    requestMock.url = 'localhost:8080/register';

    const registerHandlerSpy = jest.spyOn(
      RegisterHandler.prototype,
      'handleRequest'
    );

    await sut.startServer();

    expect(registerHandlerSpy).toBeCalledTimes(1);
    expect(RegisterHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });

  it('should test handleRequest method with login path', async () => {
    requestMock.url = 'localhost:8080/login';

    const loginHandlerSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest');

    await sut.startServer();

    expect(loginHandlerSpy).toBeCalledTimes(1);
    expect(LoginHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });

  it('should test handleRequest method with reservation path', async () => {
    requestMock.url = 'localhost:8080/reservation';

    const reservationHandlerSpy = jest.spyOn(
      ReservationsHandler.prototype,
      'handleRequest'
    );

    await sut.startServer();

    expect(reservationHandlerSpy).toBeCalledTimes(1);
    expect(ReservationsHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    );
  });

  it('should test handleRequest method with unexisting path', async () => {
    requestMock.url = 'localhost:8080/tables';

    const validateTokenSpy = jest.spyOn(Authorizer.prototype, 'validateToken');

    await sut.startServer();

    expect(validateTokenSpy).not.toBeCalled();
  });

  it('should test handleRequest method with error thrown', async () => {
    requestMock.url = 'localhost:8080/reservation';

    const reservationHandlerSpy = jest.spyOn(
      ReservationsHandler.prototype,
      'handleRequest'
    );

    const error = new Error('Parsing error');
    reservationHandlerSpy.mockRejectedValue(error);

    await sut.startServer();

    expect(responseMock.writeHead).toBeCalledWith(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      JSON.stringify(`Internal server error: Parsing error`)
    );
  });

  it('should test getRouteFromUrl method with register url', () => {
    requestMock.url = '/register/';

    const result = (sut as any).getRouteFromUrl(requestMock);

    expect(result).toBe('register');
  });

  it('should test getRouteFromUrl method with register url', () => {
    requestMock.url = '/login';

    const result = (sut as any).getRouteFromUrl(requestMock);

    expect(result).toBe('login');
  });

  it('should test stopServer method', async () => {
    await sut.startServer();
    await sut.stopServer();

    expect(serverMock.close).toBeCalled();
  });
});
