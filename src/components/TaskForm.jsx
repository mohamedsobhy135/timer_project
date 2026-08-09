import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, isPast, todayString, Task } from '../utils/Task';

const initialForm = { title: '', description: '', date: '', time: '', category: 'Work' };

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const titleValid = form.title.trim().length >= 2;
  const dateInvalid = form.date !== '' && isPast(form.date, form.time);

  useEffect(() => {
    if (form.date === todayString() && form.time && isPast(form.date, form.time)) setError('That time has already passed today. Choose a later time.');
    else if (error === 'That time has already passed today. Choose a later time.') setError('');
  }, [form.date, form.time]);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFormKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      event.currentTarget.requestSubmit();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    try {
      if (!titleValid) throw new Error('Add a title with at least 2 characters.');
      if (!form.date) throw new Error('Choose a date for this task.');
      if (dateInvalid) throw new Error('Choose a future date or a later time today.');
      const task = new Task({ ...form, id: Date.now() + Math.floor(Math.random() * 1000) });
      onAdd(task);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      titleRef.current?.focus();
    }
  };

  return (
    <form className="panel form-panel" onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} noValidate>
      <div className="panel-title"><h2>Add a task</h2><span>New item</span></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="field">
        <label htmlFor="title">Task title</label>
        <input ref={titleRef} id="title" name="title" value={form.title} onChange={update} placeholder="What needs doing?" aria-invalid={form.title !== '' && !titleValid} />
        {form.title !== '' && <span className={`validation ${titleValid ? 'valid' : 'invalid'}`}>{titleValid ? 'Title looks good.' : 'Use at least 2 characters.'}</span>}
      </div>
      <div className="field"><label htmlFor="description">Description <span className="mono-label">(optional)</span></label><textarea id="description" name="description" value={form.description} onChange={update} placeholder="A useful detail or next step" /></div>
      <div className="field"><label htmlFor="date">Date</label><input id="date" name="date" type="date" min={todayString()} value={form.date} onChange={update} aria-invalid={dateInvalid} /></div>
      <div className="field"><label htmlFor="time">Time</label><input id="time" name="time" type="time" value={form.time} onChange={update} aria-invalid={dateInvalid} /></div>
      <div className="field"><label htmlFor="category">Category</label><select id="category" name="category" value={form.category} onChange={update}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div>
      <button type="submit" className="button button-orange form-submit">Add to my plan</button>
    </form>
  );
}