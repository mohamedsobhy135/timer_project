import { useEffect, useState } from 'react';
import { CATEGORIES, formatDate, formatTime, getTaskStatus, isPast } from '../utils/Task';

function displayDescription(description) {
  if (!description) return 'No description added.';
  return description.length > 105 ? `${description.slice(0, 105).trim()}…` : description;
}

export default function TaskCard({ task, onUpdate, startEditing, onEditingChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...task });
  const [error, setError] = useState('');
  const status = getTaskStatus(task);

  const beginEdit = () => {
    setDraft({ ...task });
    setError('');
    setEditing(true);
  };
  const cancelEdit = () => {
    setDraft({ ...task });
    setError('');
    setEditing(false);
  };
  const updateDraft = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };
  const saveEdit = () => {
    if (!draft.title.trim() || draft.title.trim().length < 2) {
      setError('Title must be at least 2 characters.');
      return false;
    }
    if (!draft.date || isPast(draft.date, draft.time)) {
      setError('Choose a future date or a later time today.');
      return false;
    }
    const updated = { ...task };
    ['title', 'description', 'date', 'time', 'category'].forEach((field) => { updated[field] = draft[field]; });
    onUpdate(updated);
    setEditing(false);
    return true;
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      cancelEdit();
      onEditingChange(false);
    }
  };

  useEffect(() => {
    if (startEditing && !editing) beginEdit();
  }, [startEditing]);

  if (editing) {
    return (
      <article className="task-card" onKeyDown={handleKeyDown}>
        <div className="task-card-top"><h3>Edit task</h3><span className="category-badge">Editing</span></div>
        <div className="inline-editor">
          {error && <div className="inline-editor-error" role="alert">{error}</div>}
          <div className="inline-field"><label htmlFor={`edit-title-${task.id}`}>Title</label><input id={`edit-title-${task.id}`} name="title" value={draft.title} onChange={updateDraft} autoFocus /></div>
          <div className="inline-field"><label htmlFor={`edit-description-${task.id}`}>Description</label><textarea id={`edit-description-${task.id}`} name="description" value={draft.description} onChange={updateDraft} /></div>
          <div className="inline-row"><div className="inline-field"><label htmlFor={`edit-date-${task.id}`}>Date</label><input id={`edit-date-${task.id}`} name="date" type="date" min={new Date().toISOString().slice(0, 10)} value={draft.date} onChange={updateDraft} /></div><div className="inline-field"><label htmlFor={`edit-time-${task.id}`}>Time</label><input id={`edit-time-${task.id}`} name="time" type="time" value={draft.time} onChange={updateDraft} /></div></div>
          <div className="inline-field"><label htmlFor={`edit-category-${task.id}`}>Category</label><select id={`edit-category-${task.id}`} name="category" value={draft.category} onChange={updateDraft}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div>
          <div className="task-actions"><button type="button" className="button button-primary button-small" onClick={() => { if (saveEdit()) onEditingChange(false); }}>Save changes</button><button type="button" className="button button-secondary button-small" onClick={() => { cancelEdit(); onEditingChange(false); }}>Cancel</button></div>
        </div>
      </article>
    );
  }

  return (
    <article className={`task-card status-card-${status.replace(' ', '-')}`}>
      <div className="task-card-top"><h3>{task.title}</h3><span className="category-badge">{task.category}</span></div>
      <span className={`status-badge status-${status.replace(' ', '-')}`}>{status}</span>
      <p className="task-description">{displayDescription(task.description)}</p>
      <div className="task-meta"><span aria-hidden="true">◷</span>{formatDate(task.date)} <span aria-hidden="true">·</span> {formatTime(task.time)}</div>
      <div className="task-actions"><button type="button" className="button button-secondary button-small" data-task-action="edit" data-task-id={task.id}>Edit</button><button type="button" className="button button-danger button-small" data-task-action="delete" data-task-id={task.id}>Delete</button></div>
    </article>
  );
}