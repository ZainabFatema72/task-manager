# 🗂️ Task Manager (Role-Based Access Control)

A full-stack **Task Manager application** with **JWT authentication** and **role-based access control (RBAC)**. The system supports **Admin** and **User** roles with separate dashboards and permissions.

---

## 📋 TABLE OF CONTENTS

* Project Overview
* Features
* Architecture
* Tech Stack
* Project Structure
* Authentication & Authorization
* API Endpoints
* Data Models
* Environment Variables
* Run Project
* Login Credentials
* Screens & Flow
* Error Handling
* Future Enhancements

---

## 🚀 PROJECT OVERVIEW

**Project Name:** Task Manager (RBAC)
**Description:** A role-based task management system where Admins manage users and tasks, and Users manage their assigned tasks.
**Architecture:** MERN Stack (Monolith)
**Authentication:** JWT-based authentication

---

## ✨ FEATURES

### 👑 Admin Features

* Create users
* View all users
* Assign tasks to users
* Set task priority (Low / Medium / High)
* View all tasks

### 👤 User Features

* Login & authentication
* View assigned tasks
* Update task status (Pending / In Progress / Completed)

### 🔐 Security Features

* JWT authentication
* Password hashing
* Role-based routing (Admin/User dashboards)

---

## 🏗️ ARCHITECTURE

```
Client (React + Vite)
        |
        |  JWT
        v
Backend (Node.js + Express)
        |
        v
MongoDB (Users & Tasks)
```

---

## 🧰 TECH STACK

### Frontend

* React (Vite)
* React Router DOM
* Axios
* CSS 

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs

---

## 📁 PROJECT STRUCTURE

```
task-manager/
├─ backend/
│  ├─ controllers/
│  │   ├─ authController.js
│  │   ├─ userController.js
│  │   └─ taskController.js
│  ├─ models/
│  │   ├─ User.js
│  │   └─ Task.js
│  ├─ routes/
│  │   ├─ authRoutes.js
│  │   ├─ userRoutes.js
│  │   └─ taskRoutes.js
│  ├─ middleware/
│  │   ├─ authMiddleware.js
│  │   └─ roleMiddleware.js
│  ├─ config/
│  │   └─ db.js
│  ├─ server.js
│  
│
├─ frontend/
│  ├─ src/
│  │   ├─ pages/
│  │   │   ├─ Login.jsx
|  |   |   ├─ AssignTAsk.jsx
│  │   │   ├─ AdminDashboard.jsx
│  │   │   ├─ Register.jsx
|  |   |   ├─ UserList.jsx
│  │   │   └─ UserDashboard.jsx
│  │   ├─ components/
│  │   │   ├─ Navbar.jsx
|  |   |   ├─ ProtectedRoute.jsx
│  │   ├─ services/api.js
│  │   └─ App.jsx
│  └─ vite.config.js
│
├─ package.json  # root (concurrently)
└─ README.md
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### JWT Payload

```json
{
  "id": "user_id",
  "email": "user@gmail.com",
  "role": "admin"
}
```

### Flow

1. User logs in
2. Backend verifies credentials
3. JWT token generated
4. Token stored in frontend (localStorage)
5. Protected routes accessed using token

---

## 🌐 API ENDPOINTS

### 📂 Auth Routes (`/api/auth`)

```js
router.post("/register", register);
router.post("/login", login);
```

**Endpoints**

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | /api/auth/register | Register new user    |
| POST   | /api/auth/login    | Login user & get JWT |

---

### 📂 Task Routes (`/api/tasks`)

```js
router.post("/", auth, role("admin"), createTask);
router.get("/", auth, getUserTasks);
router.put("/:id", auth, updateStatus);
```

**Endpoints**

| Method | Endpoint       | Access     | Description                            |
| ------ | -------------- | ---------- | -------------------------------------- |
| POST   | /api/tasks     | Admin      | Create & assign task                   |
| GET    | /api/tasks     | Admin/User | Admin: all tasks, User: assigned tasks |
| PUT    | /api/tasks/:id | User       | Update task status                     |

---

### 📂 User Routes (`/api/users`)

```js
router.get("/", auth, role("admin"), getAllUsers);
```

**Endpoints**

| Method | Endpoint   | Access | Description   |
| ------ | ---------- | ------ | ------------- |
| GET    | /api/users | Admin  | Get all users |

### 🔑 Auth Routes

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | /api/auth/login    | Login user                 |
| POST   | /api/auth/register | Register user (Admin only) |

### 👤 User Routes (Admin)

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /api/users | Get all users |
| POST   | /api/users | Create user   |

### ✅ Task Routes

| Method | Endpoint       | Description                            |
| ------ | -------------- | -------------------------------------- |
| POST   | /api/tasks     | Create task (Admin)                    |
| GET    | /api/tasks     | Get tasks (Admin: all, User: assigned) |
| PUT    | /api/tasks/:id | Update task status (User)              |

---

## 🗄️ DATA MODELS

### 👤 User Model (`models/User.js`)

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});
```

---

### ✅ Task Model (`models/Task.js`)

```js
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  status: {
    type: String,
    default: "Pending"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
```

### User Model

```js
{
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'user'] }
}
```

### Task Model

```js
{
  title: String,
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
```

---

## ⚙️ ENVIRONMENT VARIABLES (.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret
```

---

## ▶️ RUN PROJECT

### Install dependencies

```bash
npm install
```

### Start both frontend & backend

```bash
npm run dev
```

### Run separately

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 LOGIN CREDENTIALS

### Admin

* Email: **[admin@gmail.com](mailto:admin@gmail.com)**
* Password: **123456**

### User

* Email: **[user@gmail.com](mailto:user@gmail.com)**
* Password: **123456**

---

## ❌ ERROR HANDLING

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}
```

### Common Status Codes

* 200 – Success
* 201 – Created
* 400 – Bad Request
* 401 – Unauthorized
* 403 – Forbidden
* 500 – Server Error

---

## 🔮 FUTURE ENHANCEMENTS

* Task deadlines & reminders
* Email notifications
* Admin analytics dashboard
* Refresh token support
* Docker deployment

---

## 🙌 AUTHOR

**Zainab Fatema**
MCA | MERN Stack Developer

---

⭐ If you like this project, don’t forget to star the repository!

