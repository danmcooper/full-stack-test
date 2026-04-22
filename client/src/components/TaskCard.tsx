import { Task, TaskStatus } from '../types';
import styles from './TaskCard.module.css';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  todo: 'in-progress',
  'in-progress': 'done',
  done: 'todo',
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TaskCard({ task, onDelete, onStatusChange }: Props) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`${styles.card} ${styles[task.status]}`}>
      <div className={styles.header}>
        <span className={`${styles.priority} ${styles[`priority_${task.priority}`]}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
        <span className={styles.date}>{formattedDate}</span>
      </div>

      <h3 className={styles.title}>{task.title}</h3>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.footer}>
        {/* TODO (Task 5): Replace this static status badge with a clickable button.
            Clicking it should call: onStatusChange(task.id, STATUS_CYCLE[task.status])
            This cycles the task through: todo -> in-progress -> done -> todo
            Keep the same visual style — just make it a <button> instead of a <span>. */}
        <span className={`${styles.status} ${styles[`status_${task.status}`]}`}>
          {STATUS_LABELS[task.status]}
        </span>

        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
