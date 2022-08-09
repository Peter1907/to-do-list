import _ from "lodash";
import "./style.css";

const TodoItems = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 1,
  }, {
    description: 'complete To Do list project',
    completed: false,
    index: 2,
  },
];

const list = document.getElementById('list');
const display = (i) => {
  const item = document.createElement('li');
  const data = TodoItems[i];
  item.innerHTML = `<input type="checkbox" id="item${data.index}" value="${data.completed}">
  <label for="item${data.index}">${data.description}</label><br>
  <div class="dots"></div>`;
  list.appendChild(item);
};
for (let i = 0; i < TodoItems.length; i += 1) {
  display(i);
}