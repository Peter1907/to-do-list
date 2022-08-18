import { update } from './updates.js';

let TodoItems = JSON.parse(localStorage.getItem('ToDoItems')) || [];

let list = document.getElementById('list');

function setReference(listReference) {
  list = listReference;
}

const display = (i) => {
  const item = document.createElement('li');
  item.classList.add('element');
  TodoItems = JSON.parse(localStorage.getItem('ToDoItems')) || [];
  const data = TodoItems[i];
  item.innerHTML = `<input type="checkbox" class ="check-box">
  <span contenteditable="true">${data.description}</span>
  <div class="dots">&#8942;</div>`;
  list.appendChild(item);
};

class Item {
  constructor(description) {
    TodoItems = JSON.parse(localStorage.getItem('ToDoItems')) || [];
    this.description = description;
    this.completed = false;
    this.index = TodoItems.length + 1;
  }
}

const storeData = () => {
  localStorage.setItem('ToDoItems', JSON.stringify(TodoItems));
};

const removeItem = () => {
  const rmIcons = document.querySelectorAll('.element div');
  rmIcons.forEach((ele, id) => {
    if (ele.className === 'bin') {
      ele.addEventListener('click', () => {
        ele.parentElement.remove();
        TodoItems.splice(id, 1);
        for (let i = 0; i < TodoItems.length; i += 1) {
          const data = TodoItems[i];
          data.index = i + 1;
        }
        storeData();
        update();
      });
    }
  });
};

const modify = (num) => {
  const items = document.querySelectorAll('.element span');
  let elements = document.querySelectorAll('.element');
  elements[num].addEventListener('click', () => {
    items.forEach((ele, id) => {
      ele.addEventListener('keyup', (e) => {
        const data = TodoItems[id];
        data.description = e.target.innerHTML;
        storeData();
      });
    });
  });
  elements[num].addEventListener('dblclick', (event) => {
    event.stopPropagation();
    for (let i = 0; i < items.length; i += 1) {
      elements[i].style.background = 'none';
      const rmIcon = items[i].nextElementSibling;
      rmIcon.innerHTML = '&#8942';
      rmIcon.className = 'dots';
      rmIcon.style.cursor = 'move';
    }
    elements[num].style.backgroundColor = 'rgb(255, 255, 181)';
    const rmIcon = items[num].nextElementSibling;
    rmIcon.innerHTML = '&#x1F5D1';
    rmIcon.className = 'bin';
    rmIcon.style.cursor = 'pointer';
    removeItem();
  });
  window.addEventListener('click', () => {
    for (let i = 0; i < items.length; i += 1) {
      items[i].parentElement.style.background = 'none';
      const rmIcon = items[i].nextElementSibling;
      rmIcon.innerHTML = '&#8942';
      rmIcon.className = 'dots';
      rmIcon.style.cursor = 'move';
    }
  });
};

const add = (description) => {
  const item = new Item(description);
  TodoItems = JSON.parse(localStorage.getItem('ToDoItems')) || [];
  TodoItems.push(item);
  storeData();
  display(TodoItems.length - 1);
  modify(TodoItems.length - 1);
  removeItem();
  update();
};

export {
  display, storeData, add, removeItem, modify, setReference
};