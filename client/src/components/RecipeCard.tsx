import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Recipe } from '../types/App';
import apiService from '../services/api';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
  initialIsFavorite?: boolean;
}

function RecipeCard({ recipe, initialIsFavorite = false }: RecipeCardProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Проверяем статус избранного при загрузке, если пользователь авторизован
    const checkFavoriteStatus = async () => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        setIsFavorite(false);
        return;
      }

      try {
        const user = JSON.parse(userData);
        const favoriteStatus = await apiService.checkFavorite(user.id, recipe.id);
        setIsFavorite(favoriteStatus);
      } catch (err) {
        console.error('Error checking favorite status:', err);
        setIsFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [recipe.id]);

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы не срабатывал клик по карточке

    const userData = localStorage.getItem('user');
    if (!userData) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const user = JSON.parse(userData);

      if (isFavorite) {
        await apiService.removeFromFavorites(user.id, recipe.id);
        setIsFavorite(false);
      } else {
        await apiService.addToFavorites(user.id, recipe.id);
        setIsFavorite(true);
      }
      
      // Отправляем событие для обновления страницы избранного
      window.dispatchEvent(new Event('favoriteChanged'));
    } catch (err: any) {
      console.error('Error toggling favorite:', err);
      // Можно показать уведомление об ошибке
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.title} />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          disabled={loading}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          {isFavorite ? (
            <FaHeart className="heart-icon filled" />
          ) : (
            <FaRegHeart className="heart-icon" />
          )}
        </button>
      </div>

      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.title}</h3>

        <div className="recipe-card-meta">
          <div className="meta-item">
            <span>⏱</span>
            <span>{recipe.time} Minutes</span>
          </div>
          <div className="meta-item">
            <span>🍴</span>
            <span>{recipe.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
