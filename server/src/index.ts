import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import recipeRoutes from './recipes/recipe.routes'
import authRoutes from './auth/auth.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use(recipeRoutes)
app.use(authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
