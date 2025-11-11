import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCard from '../components/HeroCard';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import { Recipe, Category } from '../types/App';
import apiService from '../services/api';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [heroRecipe, setHeroRecipe] = useState<Recipe | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [simpleRecipes, setSimpleRecipes] = useState<Recipe[]>([]);
  const [moodRecipes, setMoodRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [moodLoading, setMoodLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Загружаем данные параллельно
        const [hero, categoriesData, recipesData] = await Promise.all([
          apiService.getHeroRecipe(),
          apiService.getCategories(),
          apiService.getRecipes({ limit: 6 }),
        ]);

        setHeroRecipe(hero);
        setCategories(categoriesData.slice(0, 5)); // Ограничиваем 5 категориями для главной
        setSimpleRecipes(recipesData);
        setMoodRecipes(recipesData); // Пока используем те же рецепты
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Загрузка рецептов по настроению
  useEffect(() => {
    const loadMoodRecipes = async () => {
      if (!selectedMood) {
        // Если настроение не выбрано, показываем обычные рецепты
        const recipes = await apiService.getRecipes({ limit: 8 });
        setMoodRecipes(recipes);
        return;
      }

      try {
        setMoodLoading(true);
        // Маппинг настроений на названия в БД (русские названия из seed.ts)
        const moodMap: Record<string, string> = {
          happy: 'весёлое',    // 😊 -> весёлое
          neutral: 'спокойное', // 😐 -> спокойное
          sad: 'грустное',      // 😞 -> грустное
        };

        const moodName = moodMap[selectedMood];
        if (moodName) {
          const recipes = await apiService.getRecipes({ mood: moodName, limit: 8 });
          setMoodRecipes(recipes);
        } else {
          // Если настроение не найдено, показываем обычные рецепты
          const recipes = await apiService.getRecipes({ limit: 8 });
          setMoodRecipes(recipes);
        }
      } catch (err) {
        console.error('Error loading mood recipes:', err);
        // В случае ошибки показываем обычные рецепты
        const recipes = await apiService.getRecipes({ limit: 8 });
        setMoodRecipes(recipes);
      } finally {
        setMoodLoading(false);
      }
    };

    loadMoodRecipes();
  }, [selectedMood]);

  const handleMoodClick = (mood: string) => {
    setSelectedMood(selectedMood === mood ? null : mood);
  };

  if (loading) {
    return (
      <div className="home-page">
        <Header />
        <main className="home-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Загрузка данных...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <Header />
        <main className="home-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
              <p>{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header />
      
      <main className="home-main">
        <div className="container">
          {/* Большая карточка рецепта */}
          {heroRecipe && <HeroCard recipe={heroRecipe} />}

          {/* Секция категорий */}
          <section className="categories-section">
            <div className="section-header">
              <h2>Категории</h2>
              <button className="view-all-btn" onClick={() => navigate('/categories')}>
                Все категории
              </button>
            </div>
            
            <div className="categories-grid">
            {categories.slice(0, 6).map((category) => (
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

            {moodLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Загрузка рецептов...</p>
              </div>
            ) : (
              <div className="recipes-grid-small">
                {moodRecipes.length > 0 ? (
                  moodRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>
                    <p>Рецепты для выбранного настроения не найдены</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
