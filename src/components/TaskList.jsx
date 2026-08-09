import { useState } from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, filter, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const filteredTasks = filter === 'All' ? tasks : tasks.filter((task) => task.category === filter);
  if (tasks.length === 0) {
    return <div className="empty-state"><div className="empty-mark">+</div><h3>Your plan is clear.</h3><p>Add your first task using the form, then give it a date and time so it knows where to belong.</p></div>;
  }
  if (filteredTasks.length === 0) {
    return <div className="empty-state"><div className="empty-mark">—</div><h3>No tasks in {filter}.</h3><p>Try another category or add a new task to this part of your day.</p></div>;
  }
  const handleTaskClick = (event) => {
    const button = event.target.closest('[data-task-action]');
    if (!button) return;
    const id = Number(button.dataset.taskId);
    const action = button.dataset.taskAction;
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    if (action === 'edit') {
      setEditingId(id);
      return;
    }
    if (action === 'delete' && window.confirm(`Delete "${task.title}"?`)) {
      onDelete(id);
    }
  };

  return <div className="task-grid" onClick={handleTaskClick}>{filteredTasks.map((task) => <TaskCard key={task.id} task={task} onUpdate={onUpdate} startEditing={editingId === task.id} onEditingChange={(isEditing) => setEditingId(isEditing ? task.id : null)} />)}</div>;
}