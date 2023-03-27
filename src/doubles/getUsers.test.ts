import axios from 'axios';

import { getUsers } from './OtherUtils';

jest.mock('axios');

describe('test getUsers with mocked axios get method', () => {
  it('should test getUsers', async () => {
    const data = [
      { name: 'Tanyo', age: 23 },
      { name: 'Martin', age: 22 },
      { name: 'Gergana', age: 20 },
    ];

    (axios.get as any).mockImplementationOnce(() => Promise.resolve(data));

    const users = await getUsers();

    expect(users).toEqual(data);
  });

  it('should test getUsers if there is an error', async () => {
    const errorMessage = 'Network Error';

    (axios.get as any).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getUsers).rejects.toThrowError(errorMessage);
  });

  it('should test getUsers if there is an error2', async () => {
    const errorMessage = 'Network Error';

    // create mock of the getUsers function
    const mockGetUsers = await jest.fn(getUsers);

    mockGetUsers.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(mockGetUsers).rejects.toThrowError(errorMessage);
  });
});
