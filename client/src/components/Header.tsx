import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Загружаем пользователя из localStorage
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Слушаем изменения в localStorage (для обновления при входе/выходе)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        loadUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Также слушаем кастомное событие для обновления в той же вкладке
    const handleUserChange = () => {
      loadUser();
    };

    window.addEventListener('userChanged', handleUserChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userChanged', handleUserChange);
    };
  }, []);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Отправляем событие для обновления в той же вкладке
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  const handleMouseEnter = () => {
    // Отменяем таймер скрытия, если он был установлен
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    // Устанавливаем задержку перед скрытием меню
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 200ms задержка
    setHideTimeout(timeout);
  };

  return (
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
          <button className="search-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          {user ? (
            <div 
              className="user-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="user-avatar">
                <img src={user.avatarUrl || 'https://i.pravatar.cc/40'} alt={user.username} />
              </div>
              {showDropdown && (
                <div 
                  className="user-dropdown"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="user-info">
                    <p className="user-name">{user.username}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={() => navigate('/login')}
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

// Когда коллеги сделают авторизацию:
// function Header() {
//   const user = useAuth()  // получаем текущего пользователя
  
//   return (
//     <header>
//       ...
//       <div className="user-avatar">
//         {user ? (
//           <img src={user.avatar} alt={user.name} />  // фото пользователя
//         ) : (
//           <img src="/default-avatar.png" alt="Guest" />  // гость
//         )}
//       </div>
//     </header>
//   )
// }