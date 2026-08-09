export const CATEGORIES = ['Work', 'Personal', 'Study', 'Other'];

export function todayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function isPast(date, time = '') {
  if (!date) return false;
  const selected = new Date(`${date}T${time || '23:59'}`);
  return selected.getTime() < Date.now();
}

export function getTaskStatus(task) {
  if (isPast(task.date, task.time)) return 'overdue';
  if (task.date === todayString()) return 'due today';
  return 'upcoming';
}

export function formatDate(date) {
  if (!date) return 'No date';
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`));
}

export function formatTime(time) {
  if (!time) return 'Any time';
  const [hour, minute] = time.split(':');
  const date = new Date();
  date.setHours(Number(hour), Number(minute), 0, 0);
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date);
}

export function serializeTasks(tasks) {
  return tasks.map((task) => [
    task.id,
    task.title,
    task.description,
    task.date,
    task.time,
    task.category,
    task.status,
  ].map((field) => String(field ?? '').replace(/\|/g, '/').replace(/;/g, ',')).join('|')).join(';');
}

export function deserializeTasks(value) {
  if (!value) return [];
  return value.split(';').filter(Boolean).map((line) => {
    const [id, title, description, date, time, category, status] = line.split('|');
    return new Task({ id: Number(id) || Date.now(), title, description, date, time, category, status });
  });
}

function Task({ id = Date.now(), title = '', description = '', date = '', time = '', category = 'Other', status = '' } = {}) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.date = date;
  this.time = time;
  this.category = category;
  this.status = status || getTaskStatus(this);
}

Task.prototype.getFormattedDate = function getFormattedDate() {
  return `${formatDate(this.date)} · ${formatTime(this.time)}`;
};

Task.prototype.setTitle = function setTitle(title) {
  if (!title || title.trim().length < 2) throw new Error('Title must be at least 2 characters.');
  this.title = title.trim();
};

export { Task };
export default Task;