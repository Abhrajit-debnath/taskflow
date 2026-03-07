# TaskFlow API

A scalable REST API with JWT authentication, role-based access control, and task management.

## Tech Stack

- Node.js + Express
- MongoDB Atlas (Cloud)
- MongoDB + Mongoose
- JWT Authentication
- Winston Logger
- Swagger UI
- Vanilla JS Frontend

## Features

- User registration & login with bcrypt password hashing
- JWT access tokens
- Role-based access (user/admin)
- Full task CRUD with filtering
- Input validation with express-validator
- Global error handling
- API documentation with Swagger

## Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### Installation

1. Clone the repo
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow

2. Install dependencies
   npm install

3. Setup environment variables
   .env

4. Fill in .env
   PORT=3000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d

5. Start server
   npm run dev

## API Documentation

Visit: http://localhost:3000/api/docs

## API Endpoints

| Method | Endpoint              | Description | Auth   |
| ------ | --------------------- | ----------- | ------ |
| POST   | /api/v1/auth/register | Register    | Public |
| POST   | /api/v1/auth/login    | Login       | Public |
| GET    | /api/v1/tasks         | Get tasks   | Bearer |
| POST   | /api/v1/tasks         | Create task | Bearer |
| PUT    | /api/v1/tasks/:id     | Update task | Bearer |
| DELETE | /api/v1/tasks/:id     | Delete task | Bearer |
| GET    | /api/v1/admin/tasks   | All tasks   | Admin  |
| GET    | /api/v1/admin/users   | All users   | Admin  |

## Scalability Notes

This project is structured to support future scaling:

- **Load Balancing** — JWT is stateless so the API can run on multiple
  servers behind a load balancer without any session sharing issues

- **Caching** — Redis can be added to cache frequent database queries.
  I implemented this in a previous project and achieved 49x faster
  response times under load testing

- **Modular Structure** — Each feature (auth, tasks, admin) is separated
  into its own folder, making it easy to split into microservices later

- **Database** — MongoDB indexes added on the user field for faster
  queries. MongoDB Atlas handles backups and availability automatically

- **Docker** — The app can be containerized with Docker for easy
  deployment on any cloud platform

## Frontend

Open frontend/index.html in browser to use the UI.

## Log Files

Log files are generated in the logs/ folder when the server runs.
Attach logs/combined.log and logs/error.log when submitting.
