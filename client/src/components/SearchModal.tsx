import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api'; // ✅ используем общий API
import './SearchModal.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  image?: string; // может быть undefined
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔁 Поиск с debounce (задержка 300 мс)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 1) {
        searchRecipes(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // 🔍 Функция поиска
  const searchRecipes = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await apiService.searchRecipes(searchTerm);
      setResults(response);
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔗 Переход к рецепту
  const handleRecipeClick = (id: string) => {
    navigate(`/recipe/${id}`);
    handleClose();
  };

  // ❌ Закрыть модалку
  const handleClose = () => {
    onClose();
    setQuery('');
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={handleClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* 🔍 Поле поиска */}
        <div className="search-modal-header">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск рецептов..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="search-close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        {/* 📄 Результаты */}
        <div className="search-results">
          {query.length === 0 && (
            <p className="search-hint">Начните вводить название рецепта</p>
          )}

          {loading && <p className="loading">Поиск...</p>}

          {query.length > 1 && !loading && results.length === 0 && (
            <p className="no-results">Ничего не найдено</p>
          )}

          {results.map((recipe) => (
            <div
              key={recipe.id}
              className="search-result-item"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <img
                src={recipe.image || '/no-image.png'} // ✅ подставляем заглушку
                alt={recipe.title}
              />
              <span>{recipe.title}</span>
            </div>
          ))}

          {results.length >= 10 && (
            <button
              className="see-all-btn"
              onClick={() => {
                navigate(`/recipes?search=${query}`);
                handleClose();
              }}
            >
              See all results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
