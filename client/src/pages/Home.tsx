import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCard from '../components/HeroCard';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import { Recipe, Category } from '../types/App';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  // Моковые данные - один рецепт для Hero карточки
  const heroRecipe: Recipe = {
    id: '1',
    title: 'Острые куриные крылышки',
    description: 'Идеальное блюдо для любителей острой еды, которое может служить как самостоятельным угощением, так и дополнением к основному блюду.',
    time: 30,
    category: 'Курица',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    authorName: 'Смирнов М.',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    date: '15 Марта 2025',
  };

  // Моковые данные - категории
  const categories: Category[] = [
    { id: '1', name: 'Завтрак', emoji: '🍙' },
    { id: '2', name: 'Веган', emoji: '🥬' },
    { id: '3', name: 'Мясо', emoji: '🥩' },
    { id: '4', name: 'Десерты', emoji: '🍰' },
    { id: '5', name: 'Перекусы', emoji: '🥪' },
    { id: '6', name: 'Сладкое', emoji: '🍫' },
  ];

  // Моковые данные - простые рецепты
  const simpleRecipes: Recipe[] = [
    {
      id: '2',
      title: 'Big and Juicy Wagyu Beef Cheeseburger',
      description: '',
      time: 30,
      category: 'Snack',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '3',
      title: 'Fresh Lime Roasted Salmon with Ginger Sauce',
      description: '',
      time: 30,
      category: 'Fish',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '4',
      title: 'Strawberry Oatmeal Pancake with Honey Syrup',
      description: '',
      time: 30,
      category: 'Breakfast',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '5',
      title: 'Fresh and Healthy Mixed Mayonnaise Salad',
      description: '',
      time: 30,
      category: 'Healthy',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '6',
      title: 'Chicken Meatballs with Cream Cheese',
      description: '',
      time: 30,
      category: 'Chicken',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '7',
      title: 'Fruity Pancake with Orange & Blueberry',
      description: '',
      time: 30,
      category: 'Breakfast',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
  ];

  return (
    <div className="home-page">
      <Header />
      
      <main className="home-main">
        <div className="container">
          {/* Большая карточка рецепта */}
          <HeroCard recipe={heroRecipe} />

          {/* Секция категорий */}
          <section className="categories-section">
            <div className="section-header">
              <h2>Категории</h2>
              <button className="view-all-btn" onClick={() => navigate('/categories')}>
                Все категории
              </button>
            </div>
            
            <div className="categories-grid">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          {/* Секция простых рецептов */}
          <section className="simple-recipes-section">
            <h2 className="section-title">Simple and tasty recipes</h2>
            
            <div className="recipes-grid">
              {simpleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;