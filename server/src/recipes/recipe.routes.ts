import Router from 'express'
import prisma from '../utils/prisma'

const router = Router()

// GET /categories
router.get('/categories', async (_req, res) => {
    const rows = await prisma.category.findMany({ orderBy: { name: 'asc' } })
    res.json(rows)
})

// GET /recipes/hero - получить hero рецепт (последний или самый популярный)
router.get('/recipes/hero', async (_req, res) => {
    const recipe = await prisma.recipe.findFirst({
        include: {
            category: true,
            author: { select: { username: true, avatarUrl: true } },
            ratings: { select: { stars: true } }
        },
        orderBy: { createdAt: 'desc' }
    })

    if (!recipe) {
        res.status(404).json({ error: 'Recipe not found' })
        return
    }

    const formatDate = (date: Date): string => {
        const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
    }

    const data = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.imageUrl || '',
        time: recipe.cookTimeMin,
        category: recipe.category?.name || '',
        rating: recipe.ratings.length
            ? Number((recipe.ratings.reduce((a, b) => a + b.stars, 0) / recipe.ratings.length).toFixed(1))
            : 0,
        description: recipe.description || '',
        authorName: recipe.author?.username || '',
        authorAvatar: recipe.author?.avatarUrl || '',
        date: formatDate(recipe.createdAt)
    }

    res.json(data)
})

// GET /recipes/:id - получить рецепт по ID
router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params

    const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
            category: true,
            author: { select: { username: true, avatarUrl: true } },
            ratings: { select: { stars: true } },
            steps: { orderBy: { position: 'asc' } },
            ingredients: {
                include: {
                    ingredient: true
                }
            },
            moods: {
                include: {
                    mood: true
                }
            }
        }
    })

    if (!recipe) {
        res.status(404).json({ error: 'Recipe not found' })
        return
    }

    const formatDate = (date: Date): string => {
        const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
    }

    const data = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.imageUrl || '',
        time: recipe.cookTimeMin,
        category: recipe.category?.name || '',
        rating: recipe.ratings.length
            ? Number((recipe.ratings.reduce((a, b) => a + b.stars, 0) / recipe.ratings.length).toFixed(1))
            : 0,
        description: recipe.description || '',
        authorName: recipe.author?.username || '',
        authorAvatar: recipe.author?.avatarUrl || '',
        date: formatDate(recipe.createdAt),
        steps: recipe.steps.map(s => ({
            position: s.position,
            text: s.text
        })),
        ingredients: recipe.ingredients.map(ri => ({
            name: ri.ingredient.name,
            quantity: ri.quantity,
            unit: ri.unit
        })),
        moods: recipe.moods.map(rm => ({
            name: rm.mood.name,
            emoji: rm.mood.emoji
        }))
    }

    res.json(data)
})

// GET /recipes?search=&categoryId=&mood=
router.get('/recipes', async (req, res) => {
    const { search, categoryId, mood } = req.query as {
        search?: string; categoryId?: string; mood?: string
    }

    const rows = await prisma.recipe.findMany({
        where: {
            ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
            ...(categoryId ? { categoryId } : {}),
            ...(mood ? { moods: { some: { mood: { name: mood } } } } : {})
        },
        include: {
            category: true,
            author: { select: { username: true, avatarUrl: true } },
            ratings: { select: { stars: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 50
    })

    const formatDate = (date: Date): string => {
        const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
    }

    const data = rows.map(r => ({
        id: r.id,
        title: r.title,
        image: r.imageUrl || '',
        time: r.cookTimeMin,
        category: r.category?.name || '',
        rating: r.ratings.length
            ? Number((r.ratings.reduce((a, b) => a + b.stars, 0) / r.ratings.length).toFixed(1))
            : 0,
        description: r.description || '',
        authorName: r.author?.username || '',
        authorAvatar: r.author?.avatarUrl || '',
        date: formatDate(r.createdAt)
    }))

    res.json(data)
})

export default router
