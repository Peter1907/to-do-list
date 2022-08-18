/**
 * @jest-environment jsdom
 */

import { modify, display, add, removeItem, setReference, resetLocalStorage } from './functions.js';

describe('Add & remove', () => {
  test('Add', () => {
    document.body.innerHTML = `<ul id="list"></ul>`;
    let list = document.getElementById('list');
    setReference(list);
    const description = 'test';
    add(description);
    add(description);
    expect(document.getElementsByTagName('li').length).toBe(2);
  });
});

describe('Test Modify & Checked', () => {
  test('Modify', () => {
    resetLocalStorage();
    document.body.innerHTML = `<ul id="list"></ul>`;
    let list = document.getElementById('list');
    setReference(list);
    const description = 'test';
    add(description);
    modify(0);
    const element = list.querySelector('.element');

    let event = new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    element.dispatchEvent(event);
    expect(document.querySelector('.element div').className).toBe('bin');
  });
});