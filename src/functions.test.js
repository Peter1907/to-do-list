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
    add(description);
    //console.log(document.body.innerHTML);
    expect(document.getElementsByTagName('li').length).toBe(2);
  });
});

describe('Test Modify & Checked', () => {
  test('Modify', () => {
    document.body.innerHTML = `<ul id="list"></ul>`;
    let list = document.getElementById('list');
    setReference(list);
    const description = 'test';
    add(description);
    console.log(document.body.innerHTML);
    modify(0);
    const element = list.querySelector('.element');

    let event = new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    element.dispatchEvent(event);
    console.log(document.body.innerHTML);

    expect(document.querySelector('.element div').className).toBe('bin');
  });
});