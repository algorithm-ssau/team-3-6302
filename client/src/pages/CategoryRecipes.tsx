import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/App';
import apiService from '../services/api';
import './CategoryRecipes.css';

function CategoryRecipes() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const location = useLocation();
  const categoryId = (location.state as any)?.categoryId;

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!categoryId) {
          setError('Категория не найдена');
          setLoading(false);
          return;
        }

        const data = await apiService.getRecipes({ categoryId });
        setRecipes(data);
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('Не удалось загрузить рецепты. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="category-recipes-page">
        <Header />
        <main className="category-recipes-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Загрузка рецептов...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-recipes-page">
        <Header />
        <main className="category-recipes-main">
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
    <div className="category-recipes-page">
      <Header />

      <main className="category-recipes-main">
        <div className="container">
          <h1 className="category-title">Категория: {categoryName}</h1>

          {recipes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>В этой категории пока нет рецептов</p>
            </div>
          ) : (
            <div className="recipes-grid">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CategoryRecipes;
