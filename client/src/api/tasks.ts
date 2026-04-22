import { Task, TaskStatus, CreateTaskInput } from '../types';

const BASE = '/api/tasks';

// Fetches all tasks. Pass a status to filter (e.g. 'todo', 'in-progress', 'done').
export async function getTasks(status?: TaskStatus): Promise<Task[]> {
  const url = status ? `${BASE}?status=${status}` : BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.statusText}`);
  return res.json() as Promise<Task[]>;
}

// Deletes a task by id — already implemented on the backend.
export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete task: ${res.statusText}`);
}

// TODO (Task 4a — Frontend API): Implement createTask.
// Make a POST request to /api/tasks with the input as JSON body.
// Return the created Task on success, throw an Error on failure.
export async function createTask(_input: CreateTaskInput): Promise<Task> {
  throw new Error('Not implemented');
}

// TODO (Task 4b — Frontend API): Implement updateTaskStatus.
// Make a PATCH request to /api/tasks/:id/status with body { status }.
// Return the updated Task on success, throw an Error on failure.
export async function updateTaskStatus(_id: string, _status: TaskStatus): Promise<Task> {
  throw new Error('Not implemented');
}
