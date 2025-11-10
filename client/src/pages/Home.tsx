import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCard from '../components/HeroCard';
import CategoryCard from '../components/CategoryCard';
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;