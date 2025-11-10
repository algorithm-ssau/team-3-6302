import React, { useState } from 'react';
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
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

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
      title: 'Большой сочный бургер с говядиной Вагю',
      description: '',
      time: 30,
      category: 'Закуски',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '3',
      title: 'Запеченный лосось с лаймом и имбирным соусом',
      description: '',
      time: 30,
      category: 'Рыба',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '4',
      title: 'Клубничные овсяные оладьи с медовым сиропом',
      description: '',
      time: 30,
      category: 'Завтрак',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '5',
      title: 'Свежий и полезный салат с майонезом',
      description: '',
      time: 30,
      category: 'Здоровое',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '6',
      title: 'Куриные фрикадельки со сливочным сыром',
      description: '',
      time: 30,
      category: 'Курица',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '7',
      title: 'Фруктовые оладьи с апельсином и черникой',
      description: '',
      time: 30,
      category: 'Завтрак',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
  ];

  // Моковые данные - рецепты по настроению
  const moodRecipes: Recipe[] = [
    {
      id: '8',
      title: 'Тропический фруктовый салат с суперфудами',
      description: '',
      time: 30,
      category: 'Здоровое',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '9',
      title: 'Большой сочный бургер с говядиной Вагю',
      description: '',
      time: 30,
      category: 'Западное',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '10',
      title: 'Здоровый японский жареный рис со спаржей',
      description: '',
      time: 30,
      category: 'Здоровое',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '11',
      title: 'Вегетарианские тако с цветной капустой и грецким орехом',
      description: '',
      time: 30,
      category: 'Восточное',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '12',
      title: 'Радужный куриный салат с заправкой из меда и горчицы',
      description: '',
      time: 30,
      category: 'Здоровое',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '13',
      title: 'Острые сэндвичи барбекю с чипсами',
      description: '',
      time: 30,
      category: 'Закуски',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '14',
      title: 'Веганские роллы в салатных листьях - острые!',
      description: '',
      time: 30,
      category: 'Морепродукты',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
    {
      id: '15',
      title: 'Куриный рамен с грибами',
      description: '',
      time: 30,
      category: 'Японское',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      authorName: '',
      authorAvatar: '',
      date: '',
    },
  ];

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
    // Здесь будет логика фильтрации рецептов по настроению
  };

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
            <h2 className="section-title">Простые и вкусные рецепты</h2>
            
            <div className="recipes-grid">
              {simpleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>

          {/* Секция рецептов по настроению */}
          <section className="mood-recipes-section">
            <div className="mood-header">
              <h2 className="mood-title">Подберём рецепт по настроению</h2>
              <div className="mood-buttons">
                <button 
                  className={`mood-btn happy ${selectedMood === 'happy' ? 'active' : ''}`}
                  onClick={() => handleMoodClick('happy')}
                >
                  😊
                </button>
                <button 
                  className={`mood-btn neutral ${selectedMood === 'neutral' ? 'active' : ''}`}
                  onClick={() => handleMoodClick('neutral')}
                >
                  😐
                </button>
                <button 
                  className={`mood-btn sad ${selectedMood === 'sad' ? 'active' : ''}`}
                  onClick={() => handleMoodClick('sad')}
                >
                  😞
                </button>
              </div>
            </div>

            <div className="recipes-grid-small">
              {moodRecipes.map((recipe) => (
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
