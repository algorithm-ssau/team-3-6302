import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Category } from '../types/App';
import apiService from '../services/api';
import './Categories.css';

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Не удалось загрузить категории. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    navigate(`/category/${categoryName}`, { state: { categoryId } });
  };

  if (loading) {
    return (
      <div className="categories-page">
        <Header />
        <main className="categories-main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Загрузка категорий...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-page">
        <Header />
        <main className="categories-main">
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
    <div className="categories-page">
      <Header />

      <main className="categories-main">
        <div className="container">
          <h1 className="categories-title">Все категории</h1>

          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.id, category.name)}
              >
                <div className="category-emoji">{category.emoji}</div>
                <h3 className="category-name">{category.name}</h3>
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Категории не найдены</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Categories;
