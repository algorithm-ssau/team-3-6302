import React from 'react';
import { Recipe } from '../types/App';
import './HeroCard.css';

interface HeroCardProps {
  recipe: Recipe;
}

const HeroCard: React.FC<HeroCardProps> = ({ recipe }) => {
  return (
    <div className="hero-card">
      <div className="hero-content">
        <div className="hero-badge">HANDPICKED RECIPES</div>
        
        <h1 className="hero-title">{recipe.title}</h1>
        
        <p className="hero-description">{recipe.description}</p>
        
        <div className="hero-meta">
          <div className="meta-item">
            <span>⏱</span>
            <span>{recipe.time} Минут</span>
          </div>
          <div className="meta-item">
            <span>🍗</span>
            <span>{recipe.category}</span>
          </div>
        </div>

        <div className="hero-footer">
          <div className="author-info">
            <img src={recipe.authorAvatar} alt={recipe.authorName} />
            <div>
              <p className="author-name">{recipe.authorName}</p>
              <p className="author-date">{recipe.date}</p>
            </div>
          </div>
          
          <button className="view-button">
            Посмотреть
            <span>→</span>
          </button>
        </div>
      </div>

      <div className="hero-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
    </div>
  );
};

export default HeroCard;
