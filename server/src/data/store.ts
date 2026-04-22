import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskInput, TaskStatus } from '../types';

const tasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment to staging.',
    status: 'done',
    priority: 'high',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Design database schema',
    description: 'Create ERD and define table relationships for the new billing feature.',
    status: 'done',
    priority: 'high',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Implement authentication middleware',
    description: 'Add JWT verification to protected API routes. Include refresh token logic.',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Build product search API',
    description: 'Full-text search endpoint with pagination and sorting support.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Write unit tests for auth module',
    description: 'Achieve at least 80% code coverage. Use Vitest.',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Update API documentation',
    description: 'Add OpenAPI spec for all new endpoints introduced in this sprint.',
    status: 'todo',
    priority: 'low',
    createdAt: new Date(Date.now() - 86400000 / 2).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Performance audit',
    description: 'Profile slow queries and add indexes. Target <100ms p95 response time.',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
];

export const store = {
  getAll(): Task[] {
    return [...tasks];
  },

  getByStatus(status: TaskStatus): Task[] {
    return tasks.filter((t) => t.status === status);
  },

  getById(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
  },

  create(input: CreateTaskInput): Task {
    const task: Task = {
      id: uuidv4(),
      title: input.title,
      description: input.description ?? '',
      status: input.status ?? 'todo',
      priority: input.priority,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },

  updateStatus(id: string, status: TaskStatus): Task | null {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    task.status = status;
    return task;
  },

  delete(id: string): boolean {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};
