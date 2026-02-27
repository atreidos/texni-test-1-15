const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const messageEl = document.getElementById('message');

function showMessage(text) {
  messageEl.textContent = text;
  messageEl.classList.add('is-visible');
}

function clearMessage() {
  messageEl.textContent = '';
  messageEl.classList.remove('is-visible');
}

function createTaskElement(text) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const left = document.createElement('div');
  left.className = 'task-left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;
  span.title = text;

  checkbox.addEventListener('change', () => {
    span.classList.toggle('completed', checkbox.checked);
  });

  left.appendChild(checkbox);
  left.appendChild(span);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Удалить';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  actions.appendChild(deleteBtn);

  li.appendChild(left);
  li.appendChild(actions);

  return li;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    showMessage('список пуст, введите текст задачи');
    taskInput.focus();
    return;
  }

  const taskEl = createTaskElement(text);
  taskList.appendChild(taskEl);
  clearMessage();

  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

taskInput.addEventListener('input', () => {
  if (messageEl.classList.contains('is-visible')) {
    clearMessage();
  }
});
