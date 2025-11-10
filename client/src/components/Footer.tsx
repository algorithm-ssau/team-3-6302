import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h1>TasteCraft</h1>
          <p>Превратите свою кухню в кулинарное чудо с TasteCraft!</p>
        </div>
        
        <nav className="footer-nav">
          <a href="/">Главная</a>
          <a href="/recipes">Рецепты</a>
          <a href="/about">О нас</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;