let TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems')) || [];

const update = () => {
  TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems')) || [];
  const textValues = document.querySelectorAll('.element span');
  const boxes = document.querySelectorAll('.check-box');
  const elements = document.querySelectorAll('.element');
  boxes.forEach((box, id) => {
    box.addEventListener('change', () => {
      TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems'));
      const data = TodoItemsV3[id];
      data.completed = box.checked;
      if (data.completed) {
        textValues[id].style.color = 'rgb(117, 117, 117)';
        textValues[id].style.textDecoration = 'line-through';
        elements[id].classList.add('completed');
      }
      localStorage.setItem('ToDoItems', JSON.stringify(TodoItemsV3));
    });
  });
};

const clearCompleted = document.getElementById('clear-completed');
clearCompleted.addEventListener('click', () => {
  TodoItemsV3 = JSON.parse(localStorage.getItem('ToDoItems'));
  const completed = document.querySelectorAll('.completed');
  completed.forEach((ele) => {
    ele.remove();
  });
  TodoItemsV3 = TodoItemsV3.filter((obj) => !obj.completed);
  for (let i = 0; i < TodoItemsV3.length; i += 1) {
    const data = TodoItemsV3[i];
    data.index = i + 1;
  }
  localStorage.setItem('ToDoItems', JSON.stringify(TodoItemsV3));
  update();
});

export { update, clearCompleted };