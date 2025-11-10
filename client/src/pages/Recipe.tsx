import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Recipe } from '../types/App';
import apiService from '../services/api';
import './Recipe.css';

function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Прокрутка в начало страницы при переходе на страницу рецепта
    window.scrollTo(0, 0);

    const loadRecipe = async () => {
      if (!id) {
        setError('ID рецепта не указан');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        console.error('Error loading recipe:', err);
        setError('Не удалось загрузить рецепт. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="recipe-page">
        <Header />
        <main className="recipe-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Загрузка рецепта...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-page">
        <Header />
        <main className="recipe-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
              <p>{error || 'Рецепт не найден'}</p>
              <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '10px 20px' }}>
                Вернуться на главную
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="recipe-page">
      <Header />
      
      <main className="recipe-main">
        <div className="container">
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>

          <div className="recipe-header">
            <div className="recipe-image-container">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            </div>
            
            <div className="recipe-info">
              <h1 className="recipe-title">{recipe.title}</h1>
              
              {recipe.description && (
                <p className="recipe-description">{recipe.description}</p>
              )}

              <div className="recipe-meta">
                <div className="meta-item">
                  <span>⏱</span>
                  <span>{recipe.time} минут</span>
                </div>
                <div className="meta-item">
                  <span>🍴</span>
                  <span>{recipe.category}</span>
                </div>
                {recipe.rating > 0 && (
                  <div className="meta-item">
                    <span>⭐</span>
                    <span>{recipe.rating}</span>
                  </div>
                )}
              </div>

              {recipe.moods && recipe.moods.length > 0 && (
                <div className="recipe-moods">
                  <span>Настроение: </span>
                  {recipe.moods.map((mood, index) => (
                    <span key={index} className="mood-tag">
                      {mood.emoji} {mood.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="recipe-author">
                {recipe.authorAvatar && (
                  <img src={recipe.authorAvatar} alt={recipe.authorName} className="author-avatar" />
                )}
                <div>
                  <p className="author-name">{recipe.authorName}</p>
                  {recipe.date && <p className="author-date">{recipe.date}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="recipe-content">
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <section className="ingredients-section">
                <h2>Ингредиенты</h2>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="ingredient-name">{ingredient.name}</span>
                      {(ingredient.quantity || ingredient.unit) && (
                        <span className="ingredient-quantity">
                          {ingredient.quantity} {ingredient.unit}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {recipe.steps && recipe.steps.length > 0 && (
              <section className="steps-section">
                <h2>Инструкция</h2>
                <ol className="steps-list">
                  {recipe.steps.map((step) => (
                    <li key={step.position} className="step-item">
                      <span className="step-number">{step.position}</span>
                      <p className="step-text">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RecipePage;

