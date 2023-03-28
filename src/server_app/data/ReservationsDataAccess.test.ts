import { DataBase } from './DataBase';
import { ReservationsDataAccess } from './ReservationsDataAccess';
import { Reservation } from '../model/ReservationModel';

const updateMock = jest.fn();
const insertMock = jest.fn();
const deleteMock = jest.fn();
const getByMock = jest.fn();
const getAllElementsMock = jest.fn();

jest.mock('./DataBase', () => {
  return {
    DataBase: jest.fn(() => {
      return {
        update: updateMock,
        insert: insertMock,
        delete: deleteMock,
        getBy: getByMock,
        getAllElements: getAllElementsMock,
      };
    }),
  };
});

describe('Test ReservationsDataAccess class', () => {
  let sut: ReservationsDataAccess;

  const reservation: Reservation = {
    id: 'testId',
    room: 'testRoom',
    user: 'testUser',
    startDate: 'startDate',
    endDate: 'endDate',
  };

  const reservation2: Reservation = {
    id: 'testId2',
    room: 'testRoom2',
    user: 'testUser2',
    startDate: 'startDate2',
    endDate: 'endDate2',
  };

  const reservationId = '12345';

  beforeEach(() => {
    sut = new ReservationsDataAccess();
    expect(DataBase).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test createReservation method', async () => {
    insertMock.mockResolvedValue(reservationId);

    const id = await sut.createReservation(reservation);

    expect(id).toBe(reservationId);
  });

  it('should test updateReservation method', async () => {
    insertMock.mockResolvedValue(reservationId);

    updateMock.mockImplementationOnce(() => {
      reservation.user = 'tanyo';
    });

    const id = await sut.createReservation(reservation);

    await sut.updateReservation(id, 'user', 'tanyo');

    expect(reservation).toHaveProperty('user', 'tanyo');
  });

  it('should test deleteReservation method', async () => {
    insertMock.mockResolvedValue(reservationId);
    let reservation3: Reservation | undefined = {
      id: 'testId',
      room: 'testRoom',
      user: 'testUser',
      startDate: 'startDate',
      endDate: 'endDate',
    };
    await sut.createReservation(reservation3);

    deleteMock.mockImplementationOnce(() => {
      reservation3 = undefined;
    });

    getByMock.mockResolvedValueOnce(undefined);

    await sut.deleteReservation(reservationId);

    const res = await sut.getReservation(reservationId);

    expect(res).toBeUndefined();
  });

  it('should test getReservation method', async () => {
    insertMock.mockResolvedValue(reservationId);
    const id = await sut.createReservation(reservation);

    getByMock.mockResolvedValueOnce(reservation);

    const actual = await sut.getReservation(id);

    expect(actual).toEqual(reservation);
    expect(getByMock).toBeCalledTimes(1);
  });

  it('should test getAllReservations method', async () => {
    insertMock.mockResolvedValue(reservationId);
    const expected = [reservation, reservation2];
    getAllElementsMock.mockResolvedValueOnce(expected);

    await sut.createReservation(reservation);
    await sut.createReservation(reservation2);

    const reservations = await sut.getAllReservations();

    expect(reservations).toEqual(expected);
  });
});
