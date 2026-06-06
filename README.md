# MERN Task Manager

A Task Manager application built with **React.js**, **Bootstrap**, **Node.js**, **Express.js**, and **MongoDB** that helps users organize and track their daily tasks.

---

## 🚀 Features

* Add new tasks
* View all tasks
* Delete tasks with confirmation
* Mark tasks as completed or active
* Search tasks by name
* Toast notifications for successful and failed operations
* Responsive UI using Bootstrap

---

## 🌐 Live Demo

**Backend Deployment:**

https://mern-task-manager-api-iota.vercel.app/

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Bootstrap
* React Icons
* React Toastify

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## ⚙️ How to Run Locally

### Clone the Repository

```bash
git clone https://github.com/AradhanaSinghh/MERN-Task-Manager.git
cd MERN-Task-Manager
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
go to src-> utils.js -> change API_URL='http://localhost:8080'
npm start
```

### Run the Application

1. Start MongoDB locally or use MongoDB Atlas.
2. Start the backend server.
3. Start the frontend application.
4. Open:

```text
http://localhost:3000
```

---

## 📚 API Documentation

### API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/tasks`     | Get all tasks     |
| POST   | `/tasks`     | Create a new task |
| PUT    | `/tasks/:id` | Update a task     |
| DELETE | `/tasks/:id` | Delete a task     |

### Test APIs Using Postman

After running the backend server, use Postman to test the API endpoints.

---

## 📂 Project Structure

```text
MERN-Task-Manager
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── package.json
│
└── README.md
```

---

## 🔮 Future Enhancements

* User Authentication
* Task Categories
* Dark Mode
* Pagination
* Due Dates and Reminders
---
