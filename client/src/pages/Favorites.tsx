import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/App';
import apiService from '../services/api';
import './Home.css';

function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userData);
      const favoritesData = await apiService.getFavorites(user.id);
      setFavorites(favoritesData);
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Не удалось загрузить избранные рецепты. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  // Обновляем список при изменении избранного
  useEffect(() => {
    const handleFavoriteChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoriteChanged', handleFavoriteChange);
    return () => window.removeEventListener('favoriteChanged', handleFavoriteChange);
  }, [loadFavorites]);

  if (loading) {
    return (
      <div className="home-page">
        <Header />
        <div className="home-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p>Загрузка избранных рецептов...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <Header />
        <div className="home-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#e74c3c' }}>
              <p>{error}</p>
              <button
                onClick={loadFavorites}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Попробовать снова
              </button>
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
              <h2>Избранные рецепты</h2>
            </div>

            {favorites.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                  У вас пока нет избранных рецептов
                </p>
                <button
                  onClick={() => navigate('/recipes')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  Перейти к рецептам
                </button>
              </div>
            ) : (
              <div className="recipes-grid">
                {favorites.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <RecipeCard recipe={recipe} initialIsFavorite={true} />
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

export default Favorites;

