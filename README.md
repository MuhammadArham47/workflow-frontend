# 🚀 WorkFlow Pro — Offline-First Workspace Manager

**WorkFlow Pro** is a modern, high-performance, local-first project management application inspired by Notion and Jira[cite: 1]. Built as a Capstone Project using **React.js**, **Redux Toolkit**, and **Tailwind CSS**, it simulates a multi-user collaborative workspace with zero backend dependencies[cite: 1]. All authentication, real-time events, and data persistence are handled completely on the client side using `localStorage` and `IndexedDB`[cite: 1].

---

## 🌟 Key Features (14 Domains / 70+ Discrete Features)

### 🔐 1. Auth & User Management (Mocked)
- Fake credential check against pre-configured local mock users[cite: 1].
- Persisted session state via `localStorage`[cite: 1].
- Editable user profiles with avatars, names, and emails stored locally[cite: 1].
- Instant multi-user profile switcher to simulate collaborative workflows[cite: 1].

### 🏢 2. Workspaces
- Full CRUD operations: Create, rename, and delete workspaces[cite: 1].
- Workspace-level settings (icon/color customization, default view presets)[cite: 1].
- Assign and invite mock users to workspaces[cite: 1].

### 📁 3. Projects
- Create, rename, archive, and delete projects within workspaces[cite: 1].
- Project color tagging, icon customization, and detailed descriptions[cite: 1].
- Project-level member subsets and pre-defined task templates[cite: 1].

### 📑 4. Tasks & Subtasks
- Create, edit, duplicate, and delete tasks[cite: 1].
- Checklist-style nested subtasks with bidirectional conversion (subtask ↔ task)[cite: 1].
- Rich task attributes: Title, status, priority, due date, assignee, and custom labels[cite: 1].
- Base64/Blob file attachment support stored in state[cite: 1].
- Bulk multi-select actions for fast status updates, reassignment, or deletion[cite: 1].

### 📊 5. Multiple Data Views
- **Kanban Board:** Column-based workflow with drag-and-drop reordering[cite: 1].
- **List / Table View:** Column sorting and group-by functionality (by status, priority, assignee, label)[cite: 1].
- **Calendar View:** Visual task distribution mapped by due dates[cite: 1].
- View persistence per project[cite: 1].

### 🔍 6. Search, Filter & Sort
- Global real-time search across tasks, projects, and workspaces[cite: 1].
- Multi-variable filtering (Assignee, Label, Priority, Status, Due Date Range)[cite: 1].
- Flexible sorting (Due date, priority, created date, alphabetical) and saved filter presets[cite: 1].

### 🛡️ 7. Client-Side Roles & Permissions
- Simulated roles: `Owner`, `Admin`, `Member`, and `Viewer`[cite: 1].
- Role-based UI restriction (Viewers receive restricted state notifications on edit/delete actions)[cite: 1].

### 📜 8. Activity Log
- Per-task and aggregated project-level activity feeds[cite: 1].
- Timestamped audit logs listing acting user and modification type[cite: 1].

### 💬 9. Comments & Simulated Collaboration
- Interactive comment thread per task with simulated `@mention` autocomplete[cite: 1].
- Simulated "live" background updates pushing fake workspace events via timers[cite: 1].

### ↩️ 10. Undo/Redo & Optimistic UX
- Undo/redo state stack for task movements and edits[cite: 1].
- Interactive Toast notifications featuring inline "Undo" triggers[cite: 1].

### 🔔 11. In-App Notifications
- Notification bell with unread counter badges[cite: 1].
- Triggers for assignments, mentions, and approaching due dates[cite: 1].

### 💾 12. Persistence & Offline Management
- Full state persistence and rehydration via `localStorage` / `IndexedDB`[cite: 1].
- Offline status detection (`navigator.onLine`) and manual state reconciliation sync[cite: 1].
- Export and Import workspace data as formatted JSON files with validation[cite: 1].

### ⚡ 13. UI/UX Utilities
- **Command Palette (`Cmd + K` / `Ctrl + K`):** Quick navigation across the application[cite: 1].
- Dark/Light mode theme switcher[cite: 1].
- Responsive mobile layout with drawer navigation and collapsible sidebar[cite: 1].

### ⚙️ 14. Settings & Danger Zone
- App-wide preferences, workspace management, and confirmation dialogs for destructive actions[cite: 1].

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite / Next.js)[cite: 1]
- **State Management:** Redux Toolkit (with Persistence & Undo/Redo Slices)[cite: 1]
- **Styling:** Tailwind CSS (Glassmorphism, Responsive Grid)[cite: 1]
- **Icons:** Lucide React
- **Drag & Drop:** `@hello-pangea/dnd` / `dnd-kit`[cite: 1]
- **Storage:** `localStorage` & `IndexedDB`[cite: 1]

---

## 📂 Project Structure

```text
src/
├── assets/          # Static assets & branding icons
├── components/      # UI components
│   ├── common/      # Modals, Toast notifications, Command Palette
│   ├── kanban/      # Kanban board & drag-and-drop columns
│   ├── list/        # Sortable table/list view
│   ├── calendar/    # Calendar grid view
│   └── layout/      # Navbar, Sidebar, Header
├── mock/            # Initial mock state (users, workspaces, tasks)
├── redux/           # Redux Toolkit slices (auth, workspace, task, ui)
├── utils/           # Local storage utilities & JSON exporter
├── App.jsx          # Root component
└── main.jsx         # Application entry