import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Recipe } from '../types/App';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы не срабатывал клик по карточке
    setIsFavorite(!isFavorite);
    // Здесь потом будет запрос на сервер для добавления в избранное
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.title} />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
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
