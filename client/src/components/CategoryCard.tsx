import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types/App';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.name}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-emoji">{category.emoji}</div>
      <p className="category-name">{category.name}</p>
    </div>
  );
}

export default CategoryCard;