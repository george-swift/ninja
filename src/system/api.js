import 'regenerator-runtime/runtime.js';

const fetch = require('node-fetch');

const createNinja2D = async () => {
  const game = { name: 'Ninja 2D' };
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  };

  const response = await fetch(url, options);
  const identifier = await response.json();

  return identifier;
};

const uploadKata = async (ninja, kata) => {
  const params = {
    user: ninja,
    score: kata,
  };
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores/`;
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export {
  createNinja2D,
  uploadKata,
};