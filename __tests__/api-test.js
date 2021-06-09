import * as asyncTest from '../__mocks__/api-backend.js';
import { sortByKata } from '../src/helpers/reusables.js';

describe('Mock implementation of uploading validated input to API service', () => {
  const expectedResponse = { result: 'Leaderboard score created correctly.' };

  let isFetchCalled = false;

  const mockUpload = jest.fn().mockImplementation((url, params, ninja, kata) => {
    expect(url).toContain(`${process.env.GAME_ID}`);

    params.method = 'POST';
    asyncTest.fetchCall(url, params);

    const serializedData = { user: ninja, score: kata };

    isFetchCalled = true;

    asyncTest.mockLeaderBoard.result.push(serializedData);

    return Promise.resolve({
      json: () => Promise.resolve(expectedResponse),
    });
  });

  it('requests rankings from API service and returns a sorted list', () => mockUpload(asyncTest.url, asyncTest.params, 'Demo', 5)
    .then((response) => {
      expect(asyncTest.params.method).toMatch('POST');
      expect(isFetchCalled).not.toBeFalsy();
      const data = response.json();
      expect(data).toBeInstanceOf(Promise);
      expect(data).resolves.toHaveProperty('result', 'Leaderboard score created correctly.');
      expect(asyncTest.mockLeaderBoard.result).toHaveLength(4);
    }));
});

describe('Mock implementation of getting leaderboard from API backend', () => {
  const unsorted = asyncTest.mockLeaderBoard.result;
  const expectedLeaderboard = sortByKata(unsorted.slice());

  let isFetchCalled = false;

  const mockGetRankings = jest.fn().mockImplementation((url, params) => {
    expect(url).toContain(`${process.env.GAME_ID}`);

    params.method = 'GET';

    asyncTest.fetchCall(url, params);

    isFetchCalled = true;

    return Promise.resolve({
      json: () => Promise.resolve(expectedLeaderboard),
    });
  });

  it('requests rankings from API service and returns a sorted list', () => mockGetRankings(asyncTest.url, asyncTest.params)
    .then((response) => {
      expect(asyncTest.params.method).toMatch('GET');
      expect(isFetchCalled).toBe(true);
      const data = response.json();
      expect(data).toBeInstanceOf(Promise);
      expect(data).resolves.not.toBe(unsorted);
      expect(data).resolves.toHaveLength(3);
    }));
});
