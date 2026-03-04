# Modern Todo App

A full-stack task management application built with **Node.js**, **Express**, and **SQLite**.  
This project features custom JWT authentication and a responsive frontend for managing personal productivity.

## Features

- **Secure Authentication:** User registration and login using `bcryptjs` for password hashing and `jsonwebtoken` (JWT) for stateless session management.
- **Custom Middleware:** Protected routes via a custom `authMiddleware` that verifies tokens before allowing access to user data.
- **CRUD Operations:** Full ability to Create, Read, Update, and Delete tasks tied to a specific user ID.
- **Database Integration:** Utilizes `node:sqlite` for high-performance, synchronized database operations.
- **Persistent Storage:** Designed to move from in-memory testing to persistent `.db` file storage.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (via `node:sqlite`)
- **Security:** JSON Web Tokens (JWT), Bcrypt.js
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (Fetch API)

## Project Structure

```
├── src/
│   ├── middleware/
│   │   └── authMiddleware.js  # Token verification logic
│   ├── routes/
│   │   ├── authRoutes.js      # Register & Login endpoints
│   │   └── todoRoutes.js      # Task management endpoints
│   ├── db.js                  # Database schema & initialization
│   └── server.js              # Entry point & Express configuration
├── public/
│   ├── index.html             # Main frontend interface
│   └── styles.css             # Custom styling
└── .env                       # Environment variables (Secrets)
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add:
   ```env
   PORT=8000
   JWT_SECRET=your_super_secret_key_here
   ```

4. **Run the Server**
   ```bash
   node src/server.js
   ```
   The app will be available at `http://localhost:8000`.

## API Endpoints

### Auth
- `POST /auth/register` – Create a new account
- `POST /auth/login` – Authenticate and receive a JWT

### Todos (Requires `Authorization` header)
- `GET /todos` – Fetch all tasks for the logged-in user
- `POST /todos` – Add a new task
- `PUT /todos/:id` – Update task status (Complete/Open)
- `DELETE /todos/:id` – Remove a task

## Credits

* **Frontend**: Original UI design and frontend logic by [jamezmca](https://github.com/jamezmca).
* **Backend**: Custom Node.js/Express API and SQLite integration developed by [Ruthvik](https://github.com/ruthwikr17).

## 📝 License

Distributed under the MIT License.
