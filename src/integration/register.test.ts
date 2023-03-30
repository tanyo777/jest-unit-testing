import supertest from 'supertest';
import { Reservation } from '../server_app/model/ReservationModel';
import { HTTP_CODES } from '../server_app/model/ServerModel';
import { Server } from '../server_app/server/Server';

describe('Integration tests for the register endpoint', () => {
  let server: Server;

  const reservation: Reservation = {
    id: 'testId',
    room: 'testRoom',
    user: 'testUser',
    startDate: 'testStartDate',
    endDate: 'testEndDate',
  };

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

  let token: string;
  it('should test the login with correct username and password', () => {
    return supertest(server.server)
      .post('/login')
      .send({ userName: 'tanyo', password: 'Test@123' })
      .expect(HTTP_CODES.CREATED)
      .then((response) => {
        const resBody = response.body;
        expect(resBody).toHaveProperty('token', expect.any(String));
        token = resBody.token;
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

  let reservationId!: string;
  it('should test the create reservation endpoint', () => {
    return supertest(server.server)
      .post('/reservation')
      .set('Authorization', token)
      .send(reservation)
      .expect(HTTP_CODES.CREATED)
      .then((res) => {
        expect(res.body).toHaveProperty('reservationId', expect.any(String));
        reservationId = res.body.reservationId;
      });
  });

  it('should test the get reservation by id endpoint', () => {
    const clonedReservation = { ...reservation };
    clonedReservation.id = reservationId;

    return supertest(server.server)
      .get(`/reservation/${reservationId}`)
      .set('Authorization', token)
      .expect(HTTP_CODES.OK)
      .then((res) => {
        expect(res.body).toEqual(clonedReservation);
      });
  });

  it('should test the get all reservations endpoint', async () => {
    return supertest(server.server)
      .get(`/reservation/all`)
      .set('Authorization', token)
      .expect(HTTP_CODES.OK)
      .then((res) => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('should test the update reservation endpoint', async () => {
    return supertest(server.server)
      .put(`/reservation/${reservationId}`)
      .set('Authorization', token)
      .send({ room: 'testRoom2' })
      .expect(HTTP_CODES.OK)
      .then((res) => {
        expect(res.body).toBe(`Updated room of reservation ${reservationId}`);
      });
  });

  it('should test the update reservation endpoint without body', async () => {
    return supertest(server.server)
      .put(`/reservation/${reservationId}`)
      .set('Authorization', token)
      .send({})
      .expect(HTTP_CODES.BAD_REQUEST)
      .then((res) => {
        expect(JSON.parse(res.text)).toBe(
          'Please provide valid fields to update!'
        );
      });
  });

  it('should test the delete reservation endpoint', async () => {
    return supertest(server.server)
      .delete(`/reservation/${reservationId}`)
      .set('Authorization', token)
      .expect(HTTP_CODES.OK)
      .then((res) => {
        expect(JSON.parse(res.text)).toBe(
          `Deleted reservation with id ${reservationId}`
        );
      });
  });

  it('should test the delete reservation endpoint without id', async () => {
    return supertest(server.server)
      .delete(`/reservation`)
      .set('Authorization', token)
      .expect(HTTP_CODES.BAD_REQUEST)
      .then((res) => {
        expect(JSON.parse(res.text)).toBe('Please provide an ID!');
      });
  });

  it('should test request without token should return unauthorized', () => {
    return supertest(server.server)
      .delete(`/reservation/${reservationId}`)
      .expect(HTTP_CODES.UNAUTHORIZED)
      .then((res) => {
        expect(JSON.parse(res.text)).toBe('Unauthorized operation!');
      });
  });
});
