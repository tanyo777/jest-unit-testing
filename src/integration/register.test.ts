import supertest from 'supertest';
import { HTTP_CODES } from '../server_app/model/ServerModel';
import { Server } from '../server_app/server/Server';

describe('Integration tests for the register endpoint', () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.startServer();
  });

  afterAll(() => {
    server.stopServer();
  });

  it('should test register endpoint with valid username and password', () => {
    return supertest(server.server)
      .post('/register')
      .send({ userName: 'tanyo', password: 'Test@123' })
      .expect(HTTP_CODES.CREATED)
      .then((response) => {
        const resBody = response.body;
        expect(resBody).toHaveProperty('userId', expect.any(String));
      });
  });

  it('should test register endpoint with empty body', () => {
    return supertest(server.server)
      .post('/register')
      .send({})
      .expect(HTTP_CODES.BAD_REQUEST)
      .then((response) => {
        const resBody = response.body;
        expect(resBody).toBe('userName and password required');
      });
  });

  it('should test the login with correct username and password', () => {
    return supertest(server.server)
      .post('/login')
      .send({ userName: 'tanyo', password: 'Test@123' })
      .expect(HTTP_CODES.CREATED)
      .then((response) => {
        const resBody = response.body;
        expect(resBody).toHaveProperty('token', expect.any(String));
      });
  });

  it('should test the login with incorrect username or password', () => {
    return supertest(server.server)
      .post('/login')
      .send({ userName: 'tany', password: 'Test@12' })
      .expect(HTTP_CODES.NOT_fOUND)
      .then((response) => {
        const resBody = JSON.parse(response.text);
        expect(resBody).toBe('wrong username or password');
      });
  });

  it('should test the login with no username or password field', () => {
    return supertest(server.server)
      .post('/login')
      .send({ password: 'Test@12' })
      .expect(HTTP_CODES.BAD_REQUEST)
      .then((response) => {
        const resBody = JSON.parse(response.text);
        expect(resBody).toBe('userName and password required');
      });
  });

  it('should test the login with ocurred error', () => {
    return supertest(server.server)
      .post('/login')
      .expect(HTTP_CODES.INTERNAL_SERVER_ERROR);
  });
});
