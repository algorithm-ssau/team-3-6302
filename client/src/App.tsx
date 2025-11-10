import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/Recipe';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/category/:categoryName" element={<div>Рецепты категории</div>} />
        <Route path="/categories" element={<div>Все категории</div>} />
        <Route path="/recipes" element={<div>Все рецепты</div>} />
        <Route path="/about" element={<div>О нас</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;