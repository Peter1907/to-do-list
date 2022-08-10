import './style.css';
import { item, display, storeData, add, remove, modify, TodoItems } from './functions.js';

const list = document.getElementById('list');
for (let i = 0; i < TodoItems.length; i += 1) {
  display(i);
};

const input = document.getElementById('add');
const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  let description = input.value;
  add(description);
  input.value = '';
})

modify();