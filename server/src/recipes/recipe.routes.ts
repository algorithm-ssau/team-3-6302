import Router from 'express'
import prisma from '../utils/prisma'

const router = Router()

// GET /categories
router.get('/categories', async (_req, res) => {
    const rows = await prisma.category.findMany({ orderBy: { name: 'asc' } })
    res.json(rows)
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

    const data = rows.map(r => ({
        id: r.id,
        title: r.title,
        image: r.imageUrl,
        time: r.cookTimeMin,
        category: r.category?.name ?? null,
        rating: r.ratings.length
            ? Number((r.ratings.reduce((a, b) => a + b.stars, 0) / r.ratings.length).toFixed(2))
            : 0,
        authorName: r.author?.username ?? null,
        authorAvatar: r.author?.avatarUrl ?? null,
        date: r.createdAt.toISOString()
    }))

    res.json(data)
})

export default router
