// eslint-disable-next-line import/no-cycle
import { display, modify } from './functions.js';

let TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems')) || [];

const update = () => {
  TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems')) || [];
  const textValues = document.querySelectorAll('.element span');
  const boxes = document.querySelectorAll('.check-box');
  boxes.forEach((box, id) => {
    box.addEventListener('change', () => {
      TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems'));
      const data = TodoItemsV3[id];
      data.completed = box.checked;
      if (data.completed) {
        textValues[id].style.color = 'rgb(117, 117, 117)';
        textValues[id].style.textDecoration = 'line-through';
      } else {
        textValues[id].style.color = 'rgb(0, 0, 0)';
        textValues[id].style.textDecoration = 'none';
        }
      localStorage.setItem('ToDoItems', JSON.stringify(TodoItemsV3));
    });
  });
};

const clearCompleted = () => {
  const clearCompleted = document.getElementById('clear-completed');
  clearCompleted.addEventListener('click', () => {
    TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems'));
    TodoItemsV3 = TodoItemsV3.filter((obj) => !obj.completed);
    for (let i = 0; i < TodoItemsV3.length; i += 1) {
      const data = TodoItemsV3[i];
      data.index = i + 1;
    }
    localStorage.setItem('ToDoItems', JSON.stringify(TodoItemsV3));
    const list = document.getElementById('list');
    list.innerHTML = '';
    for (let i = 0; i < TodoItemsV3.length; i += 1) {
      display(i);
      modify(i);
    }
    update();
  });
};

export { update, clearCompleted };