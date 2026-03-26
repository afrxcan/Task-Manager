let tasks = JSON.parse(localStorage.getItem('taskr-tasks') || '[]');
let activeCategory = 'all';

const taskInput      = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const addBtn         = document.getElementById('add-btn');
const taskList       = document.getElementById('task-list');
const doneList       = document.getElementById('done-list');
const emptyActive    = document.getElementById('empty-active');
const emptyDone      = document.getElementById('empty-done');
const viewTitle      = document.getElementById('view-title');
const viewSubtitle   = document.getElementById('view-subtitle');
const doneSummary    = document.getElementById('done-summary');

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

  const check = document.createElement('div');
  check.className = 'task-check' + (task.done ? ' checked' : '');
  check.addEventListener('click', () => toggleDone(task.id));

  const text = document.createElement('span');
  text.className = 'task-text';
  text.textContent = task.text;

  const tag = document.createElement('span');
  tag.className = 'task-tag';
  tag.dataset.cat = task.category;
  tag.textContent = task.category;

  const del = document.createElement('button');
  del.className = 'task-delete';
  del.textContent = '×';
  del.addEventListener('click', () => deleteTask(task.id));

  li.append(check, text, tag, del);
  return li;
}

function updateCounts() {
  const categories = ['all', 'work', 'personal', 'study', 'other'];
  const active = tasks.filter(t => !t.done);

  categories.forEach(cat => {
    const el = document.getElementById('count-' + cat);
    if (!el) return;
    const count = cat === 'all'
      ? active.length
      : active.filter(t => t.category === cat).length;
    el.textContent = count;
  });

  const doneCount = tasks.filter(t => t.done).length;
  doneSummary.textContent = `${doneCount} task${doneCount !== 1 ? 's' : ''} done`;
}

function updateHeader() {
  const labels = {
    all:      ['All Tasks',  'What needs to get done?'],
    work:     ['Work',       'Stay on top of your work tasks.'],
    personal: ['Personal',   'Your personal to-dos.'],
    study:    ['Study',      'Keep up with your coursework.'],
    other:    ['Other',      'Everything else.'],
  };

  const [title, sub] = labels[activeCategory];
  viewTitle.textContent    = title;
  viewSubtitle.textContent = sub;
}

function render() {
  taskList.innerHTML = '';
  doneList.innerHTML = '';

  const filtered = activeCategory === 'all'
    ? tasks
    : tasks.filter(t => t.category === activeCategory);

  const activeTasks    = filtered.filter(t => !t.done);
  const completedTasks = filtered.filter(t => t.done);

  activeTasks.forEach(task => taskList.appendChild(createCard(task)));
  completedTasks.forEach(task => doneList.appendChild(createCard(task)));

  emptyActive.classList.toggle('visible', activeTasks.length === 0);
  emptyDone.classList.toggle('visible',   completedTasks.length === 0);

  updateCounts();
  updateHeader();
}

document.getElementById('category-list').addEventListener('click', (e) => {
  const item = e.target.closest('.cat-item');
  if (!item) return;

  document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('active'));
  item.classList.add('active');
  activeCategory = item.dataset.category;
  render();
});

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

render();