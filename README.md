# Task Manager

A simple and efficient Task Manager application to organize, track, and manage your daily tasks. This repository provides a robust solution for personal productivity with features including task creation, editing, deletions.
## File Structure

```
Task Manager/
├── controllers/
│   ├── auth.controller.js      # Handles user authentication logic
│   ├── task.controller.js      # Handles task CRUD operations
│   └── user.controller.js      # Handles user CRUD operations
├── database/
│   └── mongodb.js              # MongoDB connection setup
├── middlewares/
│   ├── auth.middileware.js     # JWT authentication middleware
│   └── error.middileware.js    # Centralized error handling middleware
├── models/
│   ├── user.model.js           # User schema/model
│   └── task.model.js           # Task schema/model
├── routes/
│   ├── auth.routes.js          # Authentication related routes
│   ├── task.routes.js          # Task related routes
│   └── user.routes.js          # User related routes
├── config/
│   └── env.js                  # Loads and manages environment variables
├── app.js                      # Main Express app entry point
├── package.json                # Project metadata and dependencies
└── README.md                   # Project documentation
```

- **controllers/**: Separates business logic for users and tasks, making it easy to update or add features.
- **models/**: Defines data schemas, ensuring consistent data validation and structure.
- **routes/**: Maps HTTP endpoints to controller functions, keeping routing logic clean and isolated.
- **middlewares/**: Contains reusable middleware (like authentication), promoting DRY principles.

  
## Features

- **Add Tasks:** Easily create new tasks with details such as title, description, and due date.
- **Edit & Delete Tasks:** Update or remove tasks as your complete them.
- **Task Status Tracking:** Mark tasks as pending, in progress, or completed.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (if backend is in Node.js)
- [npm](https://www.npmjs.com/) package manager

### Installation

## 🐳 Running with Docker
1. Build the image: 
   `docker build -t task-manager-api .`
2. Run the container:
   `docker run -p 5500:5500 --env-file .env task-manager-api`

1. **Clone the repository:**
   ```bash
   git clone https://github.com/1Janakiram/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the application:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. Access the app at `http://localhost:3000` (or defined port).

## API Endpoints

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## User Endpoints

### Register a New User
**POST /users**

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response**
- `201 Created`
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { "token": "<jwt_token>", "user": { ... } }
}
```

**Error Responses**
- `400 Bad Request`: Missing or invalid fields
- `409 Conflict`: User already exists

---

### Login
**POST /sign-in**

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response**
- `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": { "token": "<jwt_token>", "user": { ... } }
}
```

**Error Responses**
- `401 Unauthorized`: Invalid credentials

---

### Get All Users
**GET /users**

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
- `200 OK`
```json
[
  { ...userObject },
  ...
]
```

**Error Responses**
- `401 Unauthorized`: Missing or invalid token

---

### Get User by ID
**GET /users/:userId**

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
- `200 OK`
```json
{ ...userObject }
```

**Error Responses**
- `404 Not Found`: User not found
- `401 Unauthorized`: Missing or invalid token

---

### Update User
**PUT /users/:userId**

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Success Response**
- `200 OK`
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": { ...userObject }
}
```

**Error Responses**
- `400 Bad Request`: Invalid fields
- `404 Not Found`: User not found
- `401 Unauthorized`: Missing or invalid token

---

## Task Endpoints

### Create Task
**POST /tasks**

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "title": "Complete Project",
  "description": "Finish backend implementation",
  "dueDate": "2025-08-03",
  "user": "<userId>"
}
```

**Success Response**
- `201 Created`
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": { ...taskObject }
}
```

**Error Responses**
- `400 Bad Request`: Missing or invalid fields
- `401 Unauthorized`: Missing or invalid token

---

### Get All Tasks
**GET /tasks**

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
- `200 OK`
```json
[
  { "id": "...", "title": "..." },
  ...
]
```

**Error Responses**
- `401 Unauthorized`: Missing or invalid token

---

### Get Task by ID
**GET /tasks/:taskId**

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
- `200 OK`
```json
{ ...taskObject }
```

**Error Responses**
- `404 Not Found`: Task not found
- `401 Unauthorized`: Missing or invalid token

---

### Update Task
**PUT /tasks/:taskId**

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "completed",
  "dueDate": "2025-08-10"
}
```
*Cannot update assigned user.*

**Success Response**
- `200 OK`
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": { ...taskObject }
}
```

**Error Responses**
- `400 Bad Request`: Attempt to update assigned user or invalid fields
- `404 Not Found`: Task not found
- `401 Unauthorized`: Missing or invalid token

---

### Delete Task
**DELETE /tasks/:taskId**

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
- `200 OK`
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses**
- `404 Not Found`: Task not found
- `401 Unauthorized`: Missing or invalid token

---

## Common Error Responses

- `400 Bad Request`: Invalid or missing fields
- `401 Unauthorized`: Missing or invalid JWT token
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource
- `500 Internal Server Error`: Problem with server

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Created by [1Janakiram](https://github.com/1Janakiram) — feel free to reach out!
