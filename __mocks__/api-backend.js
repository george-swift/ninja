const fetchCall = (url, params) => params.method + url;

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores/`;

const params = {
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
};

const mockLeaderBoard = {
  result: [
    {
      user: 'John Doe',
      score: 42,
    },
    {
      user: 'Peter Parker',
      score: 35,
    },
    {
      user: 'Wonder Woman',
      score: 50,
    },
  ],
};

export {
  fetchCall,
  url,
  params,
  mockLeaderBoard,
};