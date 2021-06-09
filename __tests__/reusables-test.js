/**
 * @jest-environment jsdom
*/

import * as test from '../src/helpers/reusables.js';
import * as mock from '../__mocks__/storage-test.js';

describe('Generates random numbers between two given integers', () => {
  it('returns random between 10 and 15', () => {
    expect(test.randomInt(10, 15)).toBeGreaterThanOrEqual(10);
  });

  it('returns random between 20 and 25', () => {
    expect(test.randomInt(20, 25)).toBeLessThanOrEqual(25);
  });
});

describe('Ensures player names are valid ASCII characters', () => {
  const field = { value: ' ' };

  it('rejects an empty string', () => {
    expect(test.inputValidator(field)).toBeFalsy();
  });

  it('rejects input if player name is only one special ASCII character', () => {
    field.value = '%';
    expect(test.inputValidator(field)).toBeFalsy();
  });

  it('accepts player name if it contains a special character and one or more ASCII characters', () => {
    field.value = '-Ninja';
    expect(test.inputValidator(field)).toBeTruthy();
  });

  it('accepts player name if it contains two or more ASCII characters', () => {
    field.value = 'Ninja005';
    expect(test.inputValidator(field)).toBeTruthy();
  });
});

describe('Manages form controls', () => {
  const input = document.createElement('input');
  input.classList.add('form-control');

  it("modifies an element's class list following wrong input", () => {
    input.classList.add('is-invalid');
    expect(input.classList).toContain('is-invalid');
    test.checkField(input, 'is-invalid');
    expect(input.classList).not.toContain('is-invalid');
  });

  it('causes no side effects if input format is correct', () => {
    test.checkField(input, 'is-invalid');
    expect(input.classList).toContain('form-control');
    expect(input.classList.length).toBe(1);
  });
});

describe('Creates DOM elements', () => {
  it("can build an element and append it's children", () => {
    const attributes = { class: 'mb-2 d-flex', id: 'parent' };
    const paragraph = document.createElement('p');
    const div = test.eltBuilder('div', attributes, paragraph);

    expect(div.attributes.length).toBe(2);
    expect(div.id).toMatch('parent');
    expect(div.childElementCount).toBe(1);
  });

  it('can build and append elements one or more levels down the DOM tree', () => {
    const div = test.eltBuilder('div',
      { class: 'userAction', id: 'input-fields' },
      test.eltBuilder('input', {
        type: 'text',
        class: 'form-control mb-3',
        id: 'playerName',
        placeholder: 'Enter your name Ninja...',
        required: true,
      }), test.eltBuilder('input', {
        type: 'submit',
        value: 'Upload Kata',
        id: 'submit',
        class: 'btn btn-info w-100',
      }));

    expect(div.className).toMatch('userAction');
    expect(div.id).toMatch('input-fields');
    expect(div.childElementCount).toBe(2);

    const nameField = div.querySelector('#playerName');
    expect(nameField.attributes.length).toBe(5);
    expect(nameField.classList).toContain('form-control');

    const submit = div.querySelector('#submit');
    expect(submit.classList).toContain('btn-info');
    expect(submit.value).toMatch('Upload Kata');
  });
});

describe('Sorts an array of data objects by scores', () => {
  const response = [
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
  ];

  it('sorts ninjas by highest kata', () => {
    const { user, score } = response[0];
    expect(user).toMatch('John Doe');
    expect(score).toBe(42);

    test.sortByKata(response);

    const { user: ninja, score: kata } = response[0];
    expect(ninja).toMatch('Wonder Woman');
    expect(kata).toBe(50);
  });
});

describe('Retrieving fail-safe value if local storage key has no value', () => {
  let kata;

  it('should return 0 in any such case', () => {
    kata = mock.mockRetrieveKata();
    expect(kata).toEqual(0);
  });
});

describe("Storing a player's score on damage call", () => {
  const kata = 150;

  it('should store the coins after each game', () => {
    mock.mockStoreKata(kata);
    expect(mock.mockRetrieveKata()).toEqual(150);
  });
});

describe('Retrieving an updated score if a player beats their previous record', () => {
  let kata = 20;

  it('should return the updated score in such event', () => {
    mock.mockStoreKata(kata);
    expect(mock.mockRetrieveKata()).toEqual(20);

    kata += kata ** 2;
    mock.mockStoreKata(kata);
    expect(mock.mockRetrieveKata()).toEqual(420);
  });
});
