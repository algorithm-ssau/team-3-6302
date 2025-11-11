import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate('/');
    // Прокрутка в начало страницы
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h1>TasteCraft</h1>
          <p>Превратите свою кухню в кулинарное чудо с TasteCraft!</p>
        </div>
        
        <nav className="footer-nav">
          {/* Navigate home and scroll to top */}
          <Link to="/" onClick={handleHomeClick}>Главная</Link>
          <Link to="/recipes">Рецепты</Link>
          <Link to="/about">О нас</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;