import Router from 'express'
import prisma from '../utils/prisma'
import crypto from 'crypto'

const router = Router()

// Простое хеширование пароля (для учебного проекта)
const hashPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex')
}

// POST /auth/signup - регистрация
router.post('/auth/signup', async (req, res) => {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
        res.status(400).json({ error: 'Все поля обязательны' })
        return
    }

    if (password.length < 6) {
        res.status(400).json({ error: 'Пароль должен быть не менее 6 символов' })
        return
    }

    try {
        // Проверяем, существует ли пользователь
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username: fullName }
                ]
            }
        })

        if (existingUser) {
            res.status(400).json({ error: 'Пользователь с таким email или именем уже существует' })
            return
        }

        // Создаем пользователя
        const user = await prisma.user.create({
            data: {
                username: fullName,
                email,
                passwordHash: hashPassword(password),
                avatarUrl: `https://i.pravatar.cc/150?u=${email}`
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true
            }
        })

        res.json({ 
            message: 'Регистрация успешна',
            user 
        })
    } catch (error) {
        console.error('Signup error:', error)
        res.status(500).json({ error: 'Ошибка при регистрации' })
    }
})

// POST /auth/login - вход
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ error: 'Email и пароль обязательны' })
        return
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            res.status(401).json({ error: 'Неверный email или пароль' })
            return
        }

        // Проверяем пароль
        const hashedPassword = hashPassword(password)
        if (user.passwordHash !== hashedPassword) {
            res.status(401).json({ error: 'Неверный email или пароль' })
            return
        }

        // Возвращаем данные пользователя (без пароля)
        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: 'Ошибка при входе' })
    }
})

// GET /auth/me - получить текущего пользователя (по email для простоты)
router.get('/auth/me', async (req, res) => {
    const { email } = req.query

    if (!email) {
        res.status(401).json({ error: 'Не авторизован' })
        return
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: email as string },
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true
            }
        })

        if (!user) {
            res.status(404).json({ error: 'Пользователь не найден' })
            return
        }

        res.json({ user })
    } catch (error) {
        console.error('Get user error:', error)
        res.status(500).json({ error: 'Ошибка при получении пользователя' })
    }
})

export default router

