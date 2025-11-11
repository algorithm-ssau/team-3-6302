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

  // Профиль пользователя
  updateProfile: async (userId: string, username?: string, fullName?: string, email?: string) => {
    const response = await api.put('/auth/profile', { userId, username, fullName, email });
    return response.data;
  },

  changePassword: async (userId: string, currentPassword: string, newPassword: string) => {
    const response = await api.put('/auth/password', { userId, currentPassword, newPassword });
    return response.data;
  },

  updateAvatar: async (userId: string, avatarUrl: string) => {
    const response = await api.put('/auth/avatar', { userId, avatarUrl });
    return response.data;
  },

  deleteAvatar: async (userId: string) => {
    const response = await api.delete('/auth/avatar', { data: { userId } });
    return response.data;
  },

  deleteAccount: async (userId: string) => {
    const response = await api.delete('/auth/account', { data: { userId } });
    return response.data;
  },

  // Избранное
  addToFavorites: async (userId: string, recipeId: string) => {
    const response = await api.post('/favorites', { userId, recipeId });
    return response.data;
  },

  removeFromFavorites: async (userId: string, recipeId: string) => {
    const response = await api.delete('/favorites', { data: { userId, recipeId } });
    return response.data;
  },

  getFavorites: async (userId: string): Promise<Recipe[]> => {
    const response = await api.get<Recipe[]>(`/favorites/${userId}`);
    return response.data;
  },

  checkFavorite: async (userId: string, recipeId: string): Promise<boolean> => {
    const response = await api.get<{ isFavorite: boolean }>(`/favorites/check/${userId}/${recipeId}`);
    return response.data.isFavorite;
  },
};

export default apiService;

