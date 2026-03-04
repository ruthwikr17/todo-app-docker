# Todo-Rest-API: Containerized Backend

Enterprise-Grade Task Management Service

A robust, type-safe REST API built to demonstrate the integration of Node.js, Prisma, and PostgreSQL within a fully containerized environment. This project focuses on secure authentication (JWT) and a "Docker-first" development lifecycle.

## 🏗 Architecture & Design

- **Layered Architecture**: Separates concerns into Routes, Controllers, and Database logic.
- **Stateless Auth**: Uses JSON Web Tokens (JWT) for secure, scalable session management.
- **Database Resilience**: Leverages Prisma's auto-generated client and type safety to prevent runtime database errors.
- **Infrastructure as Code**: Uses Docker Compose to manage multi-container networking and persistent data volumes.

## 🛠 Tech Stack

- **Runtime**: Node.js v24 (Alpine)
- **Framework**: Express.js
- **ORM**: Prisma 7.x
- **Database**: PostgreSQL 13
- **Security**: JWT & Bcrypt
- **DevOps**: Docker / Docker Compose

## 🚀 Getting Started

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=8000
DATABASE_URL="postgresql://postgres:postgres@db:5432/todoapp"
JWT_SECRET="your_secure_random_string"
NODE_ENV="development"
```

### 2. Deployment with Docker

This project is optimized for Docker. To build and start all services:

```bash
# Wipe old artifacts and start fresh
docker compose down -v
docker compose up --build
```

### 3. Initialize Database (Migration)

Run this in a separate terminal to sync your Prisma schema with the PostgreSQL container:

```bash
docker compose run app npx prisma migrate dev --name init
```

## 📡 API Documentation

### Authentication

- **POST /api/auth/register**  
  Description: Creates a new user profile.  
  Request Body: `{ "email": "user@example.com", "password": "securepassword" }`

- **POST /api/auth/login**  
  Description: Validates credentials and returns a JWT.  
  Response: `{ "token": "eyJhbG..." }`

### Tasks (Requires JWT)

- **GET /api/todos**  
  Description: Returns all tasks associated with the authenticated user.

- **POST /api/todos**  
  Description: Create a new task.  
  Body: `{ "title": "Buy groceries", "description": "Milk and eggs" }`

## 📦 Project Structure

```
todo-app_2/
├── prisma/             # Schema definition & migration history
├── src/
│   ├── generated/      # Linux-generated Prisma Client (Docker Volume Protected)
│   ├── routes/         # Endpoint definitions
│   ├── controllers/    # API Business logic
│   ├── middleware/     # JWT & Error handling
│   ├── prismaClient.js # Global Prisma Instance
│   └── server.js       # App entry point
├── Dockerfile          # Multi-layer build configuration
└── docker-compose.yaml # Orchestration for App and DB services
```

## 🔧 Troubleshooting (Mac-Specific)

- **Port Conflicts**: This project uses external port 5435 for PostgreSQL to avoid conflicts with local Mac Postgres installations.
- **Volume Masking**: The `src/generated` folder is protected with an anonymous volume to prevent Mac local files from overwriting the container-built Prisma client.

## Credits

- **Frontend**: Original UI design and frontend logic by [jamezmca](https://github.com/jamezmca).
- **Backend**: Custom Node.js/Express API and SQLite integration developed by [Ruthvik](https://github.com/ruthwikr17).

## 📝 License

Distributed under the MIT License.