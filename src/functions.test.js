/**
 * @jest-environment jsdom
 */

import { modify, display, add, removeItem, setReference } from './functions.js';

describe('Add & remove', () => {
  test('Add', () => {
    document.body.innerHTML = `<ul id="list"></ul>`;
    let list = document.getElementById('list');
    setReference(list);
    const description = 'test';
    add(description);
    expect(document.getElementsByTagName('li').length).toBe(1);
  });
});

describe('Test Modify & Checked', () => {
  test('Modify', () => {
    document.body.innerHTML = `<ul id="list"></ul>`;
    let list = document.getElementById('list');
    setReference(list);
    const description = 'test';
    add(description);
    modify(0);
    document.querySelector('.element').dblclick();
    expect(document.querySelector('.element div').innerHTML).toBe('&#x1F5D1');
  });
});