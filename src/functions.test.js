/**
 * @jest-environment jsdom
 */

import { modify, display, add, removeItem, setReference, resetLocalStorage, storeData } from './functions.js';
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
    //modify(0);    //the modify function is called automatically inside the method add
    const span = list.querySelector('.element span');
    // to be able to edit the user must click the span element
    span.click();
    // as soon as the user release a key the storage get updated
    global.dispatchEvent(new KeyboardEvent('keyup', {
      key: "e",
      keyCode: 69,
      code: "KeyE",
      which: 69,
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
      bubbles: true,
    }));
    // checking if the storage got updated correctly it should contain the key test + the pressed key
    // We found out that jest doesn't support using contenteditable attribute!
    // which was the way I was manipulating the span element & the storage.
    expect(JSON.parse(localStorage.getItem('ToDoItems'))[0].description).toBe('test'); 
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


