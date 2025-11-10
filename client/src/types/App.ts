export interface Recipe {
  id: string
  title: string
  image: string
  time: number
  category: string
  rating: number
  description?: string
  authorName?: string
  authorAvatar?: string
  date?: string
}

export interface Category {
  id: string
  name: string
  emoji: string
}