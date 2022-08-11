import './style.css';
import {
  display, add, modify, TodoItemsV2, removeItem,
} from './functions.js';

for (let i = 0; i < TodoItemsV2.length; i += 1) {
  display(i);
  modify(i);
}
removeItem();

const input = document.getElementById('add');
const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  const description = input.value;
  add(description);
  input.value = '';
});
