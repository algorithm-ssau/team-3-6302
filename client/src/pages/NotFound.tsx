import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function NotFound() {
  return (
    <div className="home-page">
      <Header />
      <div className="home-main">
        <div className="container">
          <div style={{ 
            textAlign: 'center', 
            padding: '100px 0',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h1 style={{ fontSize: '120px', margin: '0', color: '#ff6b6b', fontWeight: 'bold' }}>
              404
            </h1>
            <h2 style={{ fontSize: '36px', margin: '20px 0', color: '#333' }}>
              Страница не найдена
            </h2>
            <p style={{ fontSize: '18px', color: '#777', marginBottom: '40px', maxWidth: '500px' }}>
              К сожалению, страница, которую вы ищете, не существует или была перемещена.
            </p>
            <Link
              to="/"
              style={{
                padding: '14px 32px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '500',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff5252';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6b6b';
              }}
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;

