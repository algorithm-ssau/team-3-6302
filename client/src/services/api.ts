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

  // Аутентификация
  signup: async (fullName: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { fullName, email, password });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getCurrentUser: async (email: string) => {
    const response = await api.get('/auth/me', { params: { email } });
    return response.data;
  },
};

export default apiService;

