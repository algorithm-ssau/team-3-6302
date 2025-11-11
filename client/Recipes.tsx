import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/App';
import apiService from '../services/api';
import './Home.css';

function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async (search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const recipesData = await apiService.getRecipes(search ? { search } : {});
      setRecipes(recipesData);
    } catch (err) {
      console.error('Error loading recipes:', err);
      setError('Не удалось загрузить рецепты. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadRecipes(searchQuery);
  };

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading && recipes.length === 0) {
    return (
      <div className="home-page">
        <Header />
        <div className="home-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p>Загрузка рецептов...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header />
      <div className="home-main">
        <div className="container">
          <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <div className="section-header">
              <h2>Все рецепты</h2>
            </div>

            {error && (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#e74c3c' }}>
                <p>{error}</p>
              </div>
            )}

            {recipes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p>Рецепты не найдены</p>
              </div>
            ) : (
              <div className="recipes-grid">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;

