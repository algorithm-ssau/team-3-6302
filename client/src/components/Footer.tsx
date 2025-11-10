import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h1>TasteCraft</h1>
          <p>Превратите свою кухню в кулинарное чудо с TasteCraft!</p>
        </div>
        
        <nav className="footer-nav">
          <Link to="/">Главная</Link>
          <Link to="/recipes">Рецепты</Link>
          <Link to="/about">О нас</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;