import './style.css';
import {
  display, add, modify, TodoItems
} from './functions.js';

for (let i = 0; i < TodoItems.length; i += 1) {
  display(i);
}

const input = document.getElementById('add');
const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  const description = input.value;
  add(description);
  input.value = '';
});

modify();