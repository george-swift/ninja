const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomTip = () => {
  const tips = [
    'Press the ⬆️ arrow key twice to double jump',
    'The enemy sends more bombs with each level up',
    'Collect all fallen stars to a unlock new level',
    'Bombs are even faster when you reach 250 kata',
    'Check the rankings to see how your ninja compares',
    'Pause and take a breather if it gets too much',
  ];

  return tips[randomInt(0, 5)];
};

const inputValidator = (field) => {
  const rex = /\d+|\w+/;
  return !!rex.exec(field.value);
};

const checkField = (elem, className) => {
  if (!elem.classList.contains(className)) return;
  elem.classList.remove(className);
};

const eltBuilder = (name, attrs, ...children) => {
  const dom = document.createElement(name);

  Object.entries(attrs).forEach(([key, value]) => {
    dom.setAttribute(key, value);
  });

  [...children].forEach((child) => dom.appendChild(child));

  return dom;
};

const sortByKata = (data) => data.sort((ninja1, ninja2) => ninja2.score - ninja1.score);

const storeKata = (kata) => {
  const total = JSON.stringify(kata);
  localStorage.setItem('kata', total);
};

const retrieveKata = () => {
  const total = localStorage.getItem('kata') ? JSON.parse(localStorage.getItem('kata')) : 0;
  return total;
};

export {
  randomInt,
  randomTip,
  inputValidator,
  checkField,
  eltBuilder,
  sortByKata,
  storeKata,
  retrieveKata,
};