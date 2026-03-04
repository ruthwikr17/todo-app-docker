import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"


const app = express()
const PORT = process.env.PORT || 8000


// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)

// Get the directory name from the file path
const __dirname = dirname(__filename)


// Middleware
// Middleware to allow server to interpet JSON (converts request data (string) to JSON) 
app.use(express.json())

// This makes everything in the public folder accessible automatically
app.use(express.static(path.join(__dirname, "..", "public")));


// Serve up the HTML file from /public directory
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})


// Routes
// Authentication Routes
app.use("/auth", authRoutes)

// To-do Routes
app.use("/todos", authMiddleware, todoRoutes)


app.listen(PORT, () => {
    console.log(`Sever is running on Port ${PORT}`)
})