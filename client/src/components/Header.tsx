import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import SearchModal from './SearchModal';
import './Header.css';
import guestProfilePic from '../assets/guest-profile-pic.svg';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener('userChanged', loadUser);
    return () => window.removeEventListener('userChanged', loadUser);
  }, []);

  const handleAvatarClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>TasteCraft</h1>
            </Link>
          </div>
          
          <nav className="nav">
            <Link to="/">Главная</Link>
            <Link to="/recipes">Рецепты</Link>
            <Link to="/about">О нас</Link>
          </nav>
          
          <div className="header-actions">
            <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {user && (
              <Link 
                to="/favorites" 
                className="favorites-link"
                title="Избранное"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  color: '#333',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <FaHeart style={{ fontSize: '20px' }} />
              </Link>
            )}
            <div className="user-avatar" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
              <img 
              src={user?.avatarUrl || guestProfilePic}
              //  src={user?.avatarUrl || `https://i.pravatar.cc/40?u=${user?.email || 'guest'}`} 
                alt={user?.username || 'User'} 
              /> 
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Header;
