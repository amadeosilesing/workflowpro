# 🚀 WorkFlowPro

A modern full-stack project and task management platform built with Next.js, TypeScript and PostgreSQL.

---

## 🧠 Overview

WorkFlowPro is a scalable web application that allows users to manage projects and tasks efficiently.

Users can:

- Create and manage projects
- Add tasks within each project
- Track task status (To Do, In Progress, Done)
- View project progress and task statistics

This project demonstrates professional full-stack architecture, secure authentication with JWT, relational database design, and clean code practices.

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- JWT Authentication
- Drizzle ORM

### Database

- PostgreSQL

### Other Tools

- Git
- ESLint

---

## 🗄 Database Architecture

Relational data model:

- **Users**
- **Projects** (belongs to user)
- **Tasks** (belongs to project)

Proper foreign key relationships ensure data integrity and scalability.

---

## 🔐 Authentication

- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware
- User-specific data access

---

## 📦 Features

### Authentication

- [ ] User registration
- [ ] Login
- [ ] JWT generation
- [ ] Protected routes

### Projects

- [ ] Create project
- [ ] Edit project
- [ ] Delete project
- [ ] List user projects

### Tasks

- [ ] Create task
- [ ] Update task status
- [ ] Delete task
- [ ] Filter tasks by status

### Dashboard

- [ ] Project overview
- [ ] Task statistics

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_super_secret_key
```

⚠️ Never commit your `.env.local` file.

---

## 🎯 Purpose of This Project

This project was built to demonstrate professional full-stack development skills, including:

- Modern React architecture
- Backend API design
- Database modeling
- Authentication systems
- Clean project structure
- Scalable application patterns

---

## 📌 Author

Amadeo Siles  
Full Stack Developer
