import { IncomingMessage } from 'http';
import { getRequestBody } from './Utils';

const requestMock = {
  on: jest.fn(),
};

describe('Test getRequestBody from Utils.ts', () => {
  const dataObject = {
    name: 'Tanyo',
    age: 23,
    city: 'Plovdiv',
  };

  const dataObjectJSON = JSON.stringify(dataObject);

  const invalidDataObjectJSON = afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return object for valid JSON', async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == 'data') {
        cb(dataObjectJSON);
      } else {
        cb();
      }
    });

    const actual = await getRequestBody(requestMock as any as IncomingMessage);

    expect(actual).toEqual(dataObject);
  });

  it('should throw and error for invalid JSON', async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == 'data') {
        cb('a' + dataObjectJSON);
      } else {
        cb();
      }
    });

    await expect(
      getRequestBody(requestMock as any as IncomingMessage)
    ).rejects.toThrowError();
  });

  it('should throw and error for unexpected error', async () => {
    const error = new Error('Something went wrong!');

    requestMock.on.mockImplementation((event, cb) => {
      if (event == 'error') {
        cb(error);
      }
    });

    await expect(
      getRequestBody(requestMock as any as IncomingMessage)
    ).rejects.toThrow('Something went wrong!');
  });
});
