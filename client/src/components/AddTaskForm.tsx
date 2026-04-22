import { Task } from '../types';
import styles from './AddTaskForm.module.css';

interface Props {
  onSuccess: (task: Task) => void;
}

// TODO (Task 7): Implement the AddTaskForm component.
//
// Render a form with the following fields:
//   - Title (text input, required)
//   - Description (textarea, optional)
//   - Priority (select: low | medium | high, required, default 'medium')
//   - A submit button labeled "Add Task"
//
// On submit:
//   1. Prevent default form submission
//   2. Call createTask() from src/api/tasks.ts with the form values
//   3. Call onSuccess(createdTask) so the parent can update its list
//   4. Reset the form fields back to their defaults
//   5. If the API call fails, display the error message near the submit button
//
// Use the CSS classes in AddTaskForm.module.css — they're already written for you.
export function AddTaskForm(_props: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.placeholder}>AddTaskForm not yet implemented</p>
    </div>
  );
}
