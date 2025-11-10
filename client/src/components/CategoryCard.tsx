import React from 'react';
import { Category } from '../types/App';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="category-card">
      <div className="category-emoji">{category.emoji}</div>
      <p className="category-name">{category.name}</p>
    </div>
  );
}

export default CategoryCard;
