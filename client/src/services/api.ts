import axios from 'axios';
import { Recipe, Category } from '../types/App';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Получить hero рецепт
  getHeroRecipe: async (): Promise<Recipe> => {
    const response = await api.get<Recipe>('/recipes/hero');
    return response.data;
  },

  // Получить категории
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  // Получить рецепты
  getRecipes: async (params?: {
    search?: string;
    categoryId?: string;
    mood?: string;
    limit?: number;
  }): Promise<Recipe[]> => {
    const response = await api.get<Recipe[]>('/recipes', { params });
    return response.data;
  },

  // Получить рецепт по ID
  getRecipeById: async (id: string): Promise<Recipe> => {
    const response = await api.get<Recipe>(`/recipes/${id}`);
    return response.data;
  },

    searchRecipes: async (query: string): Promise<Recipe[]> => {
    const response = await api.get<Recipe[]>('/recipes/search', {
      params: { q: query },
    });
    return response.data;
  },
};

export default apiService;

