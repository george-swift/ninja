/**
 * @jest-environment jsdom
*/

import { eltBuilder } from '../src/helpers/reusables.js';

describe('Snapshot testing for consistent UI design', () => {
  test('Element builder does not change unexpectedly', () => {
    const templateContainer = eltBuilder('div', {
      class: 'shadow-lg p-4',
      id: 'phaser-game',
    }, eltBuilder('div', {
      class: 'canvas-sibling',
    }), eltBuilder('canvas', {
      id: 'canvas',
    }));
    expect(templateContainer).toMatchSnapshot();
  });
});