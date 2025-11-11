import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/Recipe';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Categories from './pages/Categories';
import CategoryRecipes from './pages/CategoryRecipes';
import CookieNotice from './components/CookieNotice';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CookieNotice />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category/:categoryName" element={<CategoryRecipes />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/recipes" element={<div>Все рецепты</div>} />
        <Route path="/about" element={<div>О нас</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;