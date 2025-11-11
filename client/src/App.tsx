import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/Recipe';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Categories from './pages/Categories';
import Recipes from './pages/Recipes';
import CategoryRecipes from './pages/CategoryRecipes';
import About from './pages/About';
import NotFound from './pages/NotFound';
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/category/:categoryName" element={<CategoryRecipes />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
