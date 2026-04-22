import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import styles from './TaskList.module.css';

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskList({ tasks, onDelete, onStatusChange }: Props) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
