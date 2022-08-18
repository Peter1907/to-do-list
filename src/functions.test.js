/**
 * @jest-environment jsdom
 */

import { modify, display, add, removeItem } from './functions.js';

describe('Add & remove', () => {
  test('Add', () => {
    document.body.innerHTML = `<ul id="list"></ul>`;
    let list = document.getElementById('list');
    const description = 'test';
    add(description);
    expect(document.getElementsByTagName('li').length).toBe(1);
  });
});

describe('Test Modify & Checked', () => {
  test
});