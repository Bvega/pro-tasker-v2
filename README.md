Of course. Here is a simple and concise `README.md` file for your project, following the required instructions.

You can copy this entire content and paste it into the `README.md` file in the root of your `pro-tasker-v2` project folder.

-----

````markdown
# Pro-Tasker V2

Pro-Tasker is a full-stack project management application built with the MERN stack (MongoDB, Express, React, Node.js). It provides a clean and modern interface for users to register, log in, and manage their projects and tasks.

## Live Demo

* **Frontend:** [https://pro-tasker-v2-frontend.onrender.com](https://pro-tasker-v2-frontend.onrender.com)
* **Backend:** [https://pro-tasker-v2-backend.onrender.com](https://pro-tasker-v2-backend.onrender.com)

## Features

* Secure user registration and login using JSON Web Tokens (JWT).
* Full CRUD (Create, Read, Update, Delete) functionality for projects.
* Full CRUD functionality for tasks nested within projects.
* Protected routes to ensure only authenticated users can access their data.
* A clean, component-based React frontend.

## Getting Started (Local Setup)

To run this project locally, you'll need Node.js, npm, and a MongoDB Atlas account.

### 1. Backend Setup

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Create a .env file in the backend folder and add your variables:
# MONGO_URI=<Your MongoDB Connection String>
# JWT_SECRET=<Your JWT Secret Key>
# CORS_ORIGIN=http://localhost:5173

# 3. Install dependencies
npm install

# 4. Start the server
npm run dev
````

The backend server will be running on `http://localhost:5000`.

### 2\. Frontend Setup

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Create a .env.local file in the frontend folder and add the API URL:
# VITE_API_URL=http://localhost:5000

# 3. Install dependencies
npm install

# 4. Start the frontend development server
npm run dev
```

The frontend will be running on `http://localhost:5173`.

-----

## API Endpoints

All protected routes require a `Bearer <token>` in the `Authorization` header.

### User Routes

| Method | Endpoint              | Description              | Access |
| :----- | :-------------------- | :----------------------- | :----- |
| `POST` | `/api/users/register` | Register a new user      | Public |
| `POST` | `/api/users/login`    | Authenticate a user      | Public |

### Project Routes

| Method   | Endpoint           | Description                 | Access     |
| :------- | :----------------- | :-------------------------- | :--------- |
| `GET`    | `/api/projects`    | Get all projects for a user | Protected  |
| `POST`   | `/api/projects`    | Create a new project        | Protected  |
| `GET`    | `/api/projects/:id`| Get a single project by ID  | Protected  |
| `PUT`    | `/api/projects/:id`| Update a project            | Protected  |
| `DELETE` | `/api/projects/:id`| Delete a project            | Protected  |

### Task Routes

| Method   | Endpoint                               | Description              | Access    |
| :------- | :------------------------------------- | :----------------------- | :-------- |
| `GET`    | `/api/projects/:projectId/tasks`       | Get all tasks for a project | Protected |
| `POST`   | `/api/projects/:projectId/tasks`       | Create a new task        | Protected |
| `PUT`    | `/api/projects/:projectId/tasks/:taskId` | Update a task            | Protected |
| `DELETE` | `/api/projects/:projectId/tasks/:taskId` | Delete a task            | Protected |

```
```