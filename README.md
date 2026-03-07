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

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/v1/auth/register | Register | Public |
| POST | /api/v1/auth/login | Login | Public |
| GET | /api/v1/tasks | Get tasks | Bearer |
| POST | /api/v1/tasks | Create task | Bearer |
| PUT | /api/v1/tasks/:id | Update task | Bearer |
| DELETE | /api/v1/tasks/:id | Delete task | Bearer |
| GET | /api/v1/admin/tasks | All tasks | Admin |
| GET | /api/v1/admin/users | All users | Admin |

## Scalability Notes

The current architecture is built with scalability in mind:

- **Horizontal scaling** — JWT is stateless, allowing multiple instances 
  behind a load balancer (nginx/AWS ALB) without shared session state
- **Caching** — Redis caching layer can be integrated to reduce repeated 
  database queries. Previously implemented in a queue management system 
  achieving 49x throughput improvement under load testing
- **Microservices** — Controllers and routes are modular and can be 
  extracted into separate services as the application grows
- **Database** — MongoDB indexes added on frequently queried fields. 
  Atlas replica sets available for read scaling and failover
- **Docker** — Application can be containerized for consistent 
  deployment across environments
## Frontend
Open frontend/index.html in browser to use the UI.

## Log Files
Log files are generated in the logs/ folder when the server runs.
Attach logs/combined.log and logs/error.log when submitting.