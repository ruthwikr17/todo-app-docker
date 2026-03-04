import express, { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prismaClient.js"

const router = express.Router()

// Setup Routes
// Register a new user endpoint /auth/register Route
router.post("/register", async (req, res) => {
    const { username, password } = req.body

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(password, 8)

    // Save new user to the Database
    try {
        // Push new user (Username, Password) into Database
        const user = await prisma.user.create({
            data: {
                username, 
                password: encryptedPassword
            }
        })
            
        // Create a default todo to every new user
        const defaultTodo = `Hello! Add your first todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        // Create a token - to authenticate user for each of their actions
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})


// /login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        // Fetch user details based on incoming username
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        // If username doesn't exist, return status code and a message
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        // If username exists, compare encrypted passwords
        const passwordIsValid = bcrypt.compareSync(password, user.password)

        // If password is incorrect, return status code and a message
        if (!passwordIsValid) {
            return res.status(404).send({ message: "Incorrect password" })
        }

        // Successful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})


export default router