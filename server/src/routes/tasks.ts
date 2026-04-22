import { Router, Request, Response } from "express";
import { store } from "../data/store";
import { TaskStatus, TaskPriority } from "../types";

const router = Router();

const VALID_STATUSES: TaskStatus[] = ["todo", "in-progress", "done"];
const VALID_PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

// GET /api/tasks
// Returns all tasks. Supports optional ?status= query param for filtering.
//
// TODO (Task 1): Right now this returns ALL tasks regardless of query params.
// Add support for filtering by status using the ?status= query parameter.
//   - If ?status=todo is passed, return only tasks with status 'todo'
//   - If ?status=in-progress is passed, return only 'in-progress' tasks
//   - If ?status=done is passed, return only 'done' tasks
//   - If the status value is invalid, return a 400 with { error: '...' }
//   - If no ?status param is given, return all tasks (current behavior)
// Hint: use store.getByStatus(status) and store.getAll()
router.get("/", (req: Request, res: Response) => {
  const { status } = req.query;
  if (status) {
    if (!VALID_STATUSES.includes(status as TaskStatus)) {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }
    res.json(store.getByStatus(status as TaskStatus));
    return;
  }

  res.json(store.getAll());
});

// POST /api/tasks
// Creates a new task.
//
// TODO (Task 2): Implement task creation.
// Expected request body: { title: string, description?: string, priority: 'low'|'medium'|'high' }
//   - Validate that 'title' is present and non-empty (return 400 if missing)
//   - Validate that 'priority' is one of the valid values (return 400 if invalid)
//   - 'status' should default to 'todo'
//   - On success, return 201 with the created task object
// Hint: use store.create(input) — it returns the full Task object
router.post("/", (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
});

// PATCH /api/tasks/:id/status
// Updates the status of an existing task.
//
// TODO (Task 3): Implement status update.
// Expected request body: { status: 'todo'|'in-progress'|'done' }
//   - Return 404 if no task with that id exists
//   - Return 400 if the status value is missing or invalid
//   - On success, return the updated task object
// Hint: use store.updateStatus(id, status) — returns null if not found
router.patch("/:id/status", (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
});

// DELETE /api/tasks/:id — already implemented, don't modify
router.delete("/:id", (req: Request, res: Response) => {
  const deleted = store.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.status(204).send();
});

export { VALID_STATUSES, VALID_PRIORITIES };
export default router;
