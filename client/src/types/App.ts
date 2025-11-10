export interface RecipeStep {
  position: number
  text: string
}

export interface RecipeIngredient {
  name: string
  quantity?: number | null
  unit?: string | null
}

export interface RecipeMood {
  name: string
  emoji?: string | null
}

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
  steps?: RecipeStep[]
  ingredients?: RecipeIngredient[]
  moods?: RecipeMood[]
}

export interface Category {
  id: string
  name: string
  emoji: string
}