let tasks = JSON.parse(localStorage.getItem('taskr-tasks') || '[]');
let activeCategory = 'all';

const taskInput = document.getElementById('task-input');

function save() {
  localStorage.setItem('taskr-tasks', JSON.stringify(tasks));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    taskInput.style.outline = '1px solid var(--accent)';
    setTimeout(() => taskInput.style.outline = '', 800);
    return;
  }

  const task = {
    id:       uid(),
    text:     text,
    category: categorySelect.value,
    done:     false,
  };

  tasks.unshift(task);
  save();
  taskInput.value = '';
  taskInput.focus();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function toggleDone(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    save();
    render();
  }
}

function createCard(task) {
  const li = document.createElement('li');
  li.className = 'task-card';
  ...
  li.append(check, text, tag, del);
  return li;
}

categories.forEach(cat => {
  const count = cat === 'all'
    ? active.length
    : active.filter(t => t.category === cat).length;
  el.textContent = count;
});

