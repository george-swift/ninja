const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
  inputValidator,
  checkField,
  eltBuilder,
  storeKata,
  retrieveKata,
};