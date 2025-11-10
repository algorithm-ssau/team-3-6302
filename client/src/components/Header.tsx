import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>TasteCraft</h1>
        </div>
        
        <nav className="nav">
          <a href="/">Главная</a>
          <a href="/recipes">Рецепты</a>
          <a href="/about">О нас</a>
        </nav>
        
        <div className="header-actions">
          <button className="search-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/40" alt="User" /> 
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


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