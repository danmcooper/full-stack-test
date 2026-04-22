# TaskBoard — Full-Stack Take-Home

**Estimated time: 60 minutes**

Welcome! This is a partially-built task management app. The basic structure is in place and running. Your job is to implement the missing features across the frontend and backend.

---

## Setup

```bash
# 1. Install dependencies
npm run install:all

# 2. Start both servers (runs on http://localhost:5173)
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api/tasks

---

## What's Already Working

- Task list loads from the backend and renders as cards
- Delete button removes a task (frontend + backend)
- Server, routing, and in-memory data store are wired up
- All CSS and component shells are in place

---

## Your Tasks

Complete all 7 tasks below. They're marked with `// TODO` comments in the source.

---

### Task 1 — Backend: Filter tasks by status

**File:** `server/src/routes/tasks.ts` → `GET /api/tasks`

The endpoint currently returns all tasks. Update it to support an optional `?status=` query parameter.

- `GET /api/tasks` → all tasks
- `GET /api/tasks?status=todo` → only todo tasks
- `GET /api/tasks?status=in-progress` → only in-progress tasks
- Invalid status value → `400 { error: "..." }`

---

### Task 2 — Backend: Create a task

**File:** `server/src/routes/tasks.ts` → `POST /api/tasks`

Implement the endpoint. Request body: `{ title, description?, priority }`.

- `title` is required and must be non-empty → `400` if missing
- `priority` must be `"low"`, `"medium"`, or `"high"` → `400` if invalid
- Return `201` with the created task on success

---

### Task 3 — Backend: Update task status

**File:** `server/src/routes/tasks.ts` → `PATCH /api/tasks/:id/status`

Implement the endpoint. Request body: `{ status }`.

- Return `404` if the task doesn't exist
- Return `400` if status is missing or not a valid value
- Return the updated task on success

---

### Task 4 — Frontend API: Wire up create and update

**File:** `client/src/api/tasks.ts`

Implement `createTask()` and `updateTaskStatus()`. Both are stubs that currently throw. Use `fetch` — the Vite dev server proxies `/api` to the backend.

---

### Task 5 — Frontend: Status toggle on TaskCard

**File:** `client/src/components/TaskCard.tsx`

Find the `// TODO (Task 5)` comment. Replace the static status `<span>` with a clickable `<button>` that cycles the task through `todo → in-progress → done → todo` by calling `onStatusChange`.

---

### Task 6 — Frontend: FilterBar component

**File:** `client/src/components/FilterBar.tsx`

Build the filter bar. Render four buttons: **All**, **To Do**, **In Progress**, **Done**. Each button should show its count from the `counts` prop. Clicking a button calls `onFilterChange` with the corresponding status (or `undefined` for All). Use the `.active` CSS class to highlight the selected filter. All the CSS is already in `FilterBar.module.css`.

---

### Task 7 — Frontend: AddTaskForm component

**File:** `client/src/components/AddTaskForm.tsx`

Build the form. Fields: **Title** (required), **Description** (optional), **Priority** (select: low/medium/high, default medium). On submit, call `createTask()`, then call `onSuccess(task)` and reset the form. Show an error message if the request fails. All the CSS is in `AddTaskForm.module.css`.

---

## Project Structure

```
├── server/
│   └── src/
│       ├── index.ts          # Express app entry
│       ├── types.ts          # Shared types (Task, etc.)
│       ├── data/store.ts     # In-memory data store
│       └── routes/tasks.ts   # ← Tasks 1, 2, 3 live here
└── client/
    └── src/
        ├── api/tasks.ts           # ← Tasks 4 live here
        ├── components/
        │   ├── TaskCard.tsx       # ← Task 5 lives here
        │   ├── FilterBar.tsx      # ← Task 6 lives here
        │   └── AddTaskForm.tsx    # ← Task 7 lives here
        └── App.tsx                # Main app shell (read-only)
```

---

## Evaluation Criteria

| Area | What we look for |
|---|---|
| Correctness | Features work end-to-end as described |
| Code quality | Clean, readable, idiomatic TypeScript |
| Error handling | Invalid inputs are caught; errors surface clearly to the user |
| Type safety | No `any`, types flow from backend shape to UI |
| UI polish | The feature feels complete, not just technically functional |

---

## Notes

- The data store is in-memory — it resets when the server restarts. That's intentional.
- Don't modify `App.tsx`, `store.ts`, or any CSS files unless you want to.
- You can install additional packages if you have a good reason, but it's not necessary.
- If you finish early, the **bonus** is adding client-side sorting (by priority or creation date) without a backend change.
