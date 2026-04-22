import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus } from './types';
import { getTasks, deleteTask, updateTaskStatus } from './api/tasks';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { AddTaskForm } from './components/AddTaskForm';
import styles from './App.module.css';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskStatus | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      // NOTE: Until Task 1 (backend filtering) and Task 6 (FilterBar) are done,
      // this always fetches all tasks and activeFilter has no effect.
      const data = await getTasks(activeFilter);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert('Failed to delete task');
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      alert('Failed to update task status — make sure Task 3 (PATCH endpoint) is implemented');
    }
  };

  const handleTaskCreated = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
    setShowForm(false);
  };

  const counts = {
    todo: tasks.filter((t) => t.status === 'todo').length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>TaskBoard</h1>
            <p className={styles.subtitle}>Full-Stack Interview Take-Home</p>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? 'Cancel' : '+ Add Task'}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {showForm && (
          <section className={styles.section}>
            <AddTaskForm onSuccess={handleTaskCreated} />
          </section>
        )}

        <section className={styles.section}>
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </section>

        <section className={styles.section}>
          {loading ? (
            <p className={styles.state}>Loading tasks…</p>
          ) : error ? (
            <p className={styles.stateError}>{error}</p>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          )}
        </section>
      </main>
    </div>
  );
}
