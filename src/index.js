import './style.css';
import {
  display, add, modify, removeItem,
} from './functions.js';
import { update, clearCompleted } from './updates.js';

const TodoItemsV2 = JSON.parse(localStorage.getItem('ToDoItems')) || [];
if (TodoItemsV2.length > 0) {
  for (let i = 0; i < TodoItemsV2.length; i += 1) {
    display(i);
    modify(i);
  }
  removeItem();
  update();
}
clearCompleted();

const input = document.getElementById('add');
const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  const description = input.value;
  add(description);
  input.value = '';
});