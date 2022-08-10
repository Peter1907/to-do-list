var TodoItems = JSON.parse(localStorage.getItem('ToDoItems')) || [];

const list = document.getElementById('list');
const display = (i) => {
  const item = document.createElement('li');
  const data = TodoItems[i];
  item.innerHTML = `<input type="checkbox" class ="check-box ${data.index}">
  <span contenteditable="true" for="item${data.index}">${data.description}</span>
  <div class="dots">&#8942;</div>`;
  list.appendChild(item);
};

class Item {
  constructor(description) {
    this.description = description;
    this.completed = false;
    this.index = TodoItems.length;
  }
}

const storeData = () => {
  localStorage.setItem('ToDoItems', JSON.stringify(TodoItems));
};

const add = (description) => {
  const item = new Item(description);
  TodoItems.push(item);
  storeData();
  display(item.index);
  modify();
  TodoItems = JSON.parse(localStorage.getItem('ToDoItems')) || [];
};

const remove = (num) => {
  TodoItems.splice(num, 1);
  storeData();
  for (let i = 0; i < TodoItems.length; i += 1) {
    const data = TodoItems[i];
    data.index = i;
  }
  storeData();
};

const modify = () => {
  const items = document.querySelectorAll('#list span');
  for (let i = 0; i < items.length; i += 1) {
    items[i].addEventListener('click', (event) => {
      event.stopPropagation();
      for (let i = 0; i < items.length; i += 1) {
        items[i].parentElement.style.background = 'none';
        const rmIcon = items[i].nextElementSibling;
        rmIcon.innerHTML = '&#8942';
        rmIcon.style.cursor = 'move';
      }
      items[i].parentElement.style.backgroundColor = 'rgb(255, 255, 181)';
      const rmIcon = items[i].nextElementSibling;
      rmIcon.innerHTML = '&#x1F5D1';
      rmIcon.style.cursor = 'pointer';
      rmIcon.addEventListener('click', () => {
        remove(i);
        rmIcon.parentElement.remove();
      });
    });
    items[i].addEventListener('keydown', () => {
      TodoItems[i].description = items[i].innerHTML;
      storeData();
    });
  }
  window.addEventListener('click', () => {
    for (let i = 0; i < items.length; i += 1) {
      items[i].parentElement.style.background = 'none';
      const rmIcon = items[i].nextElementSibling;
      rmIcon.innerHTML = '&#8942';
      rmIcon.style.cursor = 'move';
    }
  });
};

export {
  display, storeData, add, remove, modify, TodoItems
};