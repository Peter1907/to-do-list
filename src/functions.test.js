/**
 * @jest-environment jsdom
 */

import { modify, display, add, removeItem, setReference, resetLocalStorage } from './functions.js';
import { update, clearCompleted } from './updates.js';

describe('Test Add', () => {
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

describe('Test Modify', () => {
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

  test('Checked', () => {
    resetLocalStorage();
    document.body.innerHTML = `<ul id="list"></ul>`;
    let list = document.getElementById('list');
    setReference(list);
    const description = 'test';
    add(description);
    add(description);
    add(description);
    update();
    const elements = list.querySelectorAll('.element input');
    elements[0].click();
    expect(JSON.parse(localStorage.getItem('ToDoItems'))[0].completed).toBe(true);
    expect(JSON.parse(localStorage.getItem('ToDoItems'))[1].completed).toBe(false);
  });

  test('Clear all', () => {
    resetLocalStorage();
    document.body.innerHTML = `
    <ul id="list"></ul>
    <p id="clear-completed">Clear all completed</p>
    `;
    let list = document.getElementById('list');
    let clearBtn = document.getElementById('clear-completed');
    setReference(list);
    const description = 'test';
    add(description);
    add(description);
    add(description);
    update();
    const elements = list.querySelectorAll('.element input');
    // dispatch a click event in the box to become true the completed and then this task shall be deleted by the clearAll metod
    elements[0].click();

    clearCompleted();
    clearBtn.click();
    
    // checking the localStorage demostrtes that the clearCompleted metod is working.
    expect(JSON.parse(localStorage.getItem('ToDoItems')).length).toBe(2);
    // checking the dom there should be 2 items
    expect(document.getElementsByTagName('li').length).not.toBe(3);
  });
});


