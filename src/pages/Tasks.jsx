import { useEffect, useMemo, useRef, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { CATEGORIES, deserializeTasks, getTaskStatus, serializeTasks, todayString } from '../utils/Task';

const STORAGE_KEY = 'timeplanner-pro-tasks';

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    try { return deserializeTasks(window.localStorage.getItem(STORAGE_KEY)); } catch { return []; }
  });
  const [filter, setFilter] = useState('All');
  const [success, setSuccess] = useState('');
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const tasksRef = useRef(tasks);
  const reminderIntervalRef = useRef(null);
  const successTimeoutRef = useRef(null);

  useEffect(() => {
    tasksRef.current = tasks;
    window.localStorage.setItem(STORAGE_KEY, serializeTasks(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const notified = new Set();
    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      tasksRef.current.forEach((task) => {
        const reminderKey = `${task.id}-${task.date}-${task.time}`;
        const matchesCurrentMoment = task.date === todayString() && task.time === currentTime;
        if (matchesCurrentMoment && !notified.has(reminderKey)) {
          notified.add(reminderKey);
          window.alert(`Reminder: "${task.title}" is due now.`);
        }
        if (!matchesCurrentMoment) notified.delete(reminderKey);
      });
    };
    reminderIntervalRef.current = window.setInterval(checkReminders, 30000);
    return () => {
      window.clearInterval(reminderIntervalRef.current);
      reminderIntervalRef.current = null;
    };
  }, []);

  useEffect(() => () => {
    window.clearTimeout(successTimeoutRef.current);
  }, []);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setTasks(deserializeTasks(event.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const counts = useMemo(() => tasks.reduce((result, task) => {
    result[task.category] = (result[task.category] || 0) + 1;
    return result;
  }, { Work: 0, Personal: 0, Study: 0, Other: 0 }), [tasks]);

  const addTask = (task) => {
    setTasks((current) => [...current, task]);
    setSuccess('Task added successfully.');
    window.clearTimeout(successTimeoutRef.current);
    successTimeoutRef.current = window.setTimeout(() => setSuccess(''), 3000);
  };
  const updateTask = (task) => setTasks((current) => current.map((item) => item.id === task.id ? { ...task, status: getTaskStatus(task) } : item));
  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id));

  return (
    <div className={`container tasks-page ${viewportWidth <= 820 ? 'compact-layout' : 'wide-layout'}`}>
      <div className="tasks-header"><div><div className="eyebrow">Your workspace</div><h1 className="page-heading">Make a plan.</h1><p className="page-lede">Put the next few things in one dependable place. You can change the plan whenever you need to.</p></div><div className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} on your list</div></div>
      {success && <div className="success-notification" role="status">{success}</div>}
      <div className="tasks-layout">
        <TaskForm onAdd={addTask} />
        <section className="tasks-results" aria-labelledby="task-list-heading">
          <div className="task-toolbar"><h2 id="task-list-heading">Task list</h2><div className="filter-wrap"><label htmlFor="category-filter">Show</label><select id="category-filter" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div></div>
          <div className="stats" aria-label="Task counts by category">{CATEGORIES.map((category) => <div className="stat" key={category}><span className="stat-name">{category}</span><strong className="stat-value">{counts[category]}</strong></div>)}</div>
          <TaskList tasks={tasks} filter={filter} onUpdate={updateTask} onDelete={deleteTask} />
        </section>
      </div>
    </div>
  );
}