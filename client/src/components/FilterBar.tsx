import { TaskStatus } from '../types';
import styles from './FilterBar.module.css';

interface Props {
  activeFilter: TaskStatus | undefined;
  onFilterChange: (status: TaskStatus | undefined) => void;
  counts: Record<TaskStatus, number>;
}

// TODO (Task 6): Implement the FilterBar component.
//
// Render a row of filter buttons: "All", "To Do", "In Progress", "Done".
// Each button should show a count badge (the counts prop has totals per status).
// Clicking a button should call onFilterChange with the corresponding TaskStatus,
// or undefined for "All".
// The active filter button should be visually highlighted using the .active class.
//
// Design reference:
//   [ All (7) ]  [ To Do (3) ]  [ In Progress (2) ]  [ Done (2) ]
//
// Use the CSS classes in FilterBar.module.css — they're already written for you.
export function FilterBar(_props: Props) {
  return (
    <div className={styles.bar}>
      <span className={styles.placeholder}>FilterBar not yet implemented</span>
    </div>
  );
}
