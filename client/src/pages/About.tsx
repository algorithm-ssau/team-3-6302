import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function About() {
  return (
    <div className="home-page">
      <Header />
      <div className="home-main">
        <div className="container">
          <div style={{ marginTop: '40px', marginBottom: '80px', maxWidth: '800px', margin: '40px auto 80px' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>О нас</h1>
            
            <div style={{ lineHeight: '1.8', fontSize: '18px', color: '#555' }}>
              <p style={{ marginBottom: '20px' }}>
                Добро пожаловать в <strong>TasteCraft</strong> — ваше место для вдохновения в кулинарии!
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                Мы создали эту платформу для всех, кто любит готовить и открывать новые вкусы. 
                Здесь вы найдете тысячи рецептов на любой вкус и настроение.
              </p>
              
              <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px', color: '#333' }}>
                Наша миссия
              </h2>
              <p style={{ marginBottom: '20px' }}>
                Сделать кулинарию доступной и увлекательной для каждого. Мы верим, что готовка — 
                это не просто процесс, а настоящее искусство, которое приносит радость и объединяет людей.
              </p>
              
              <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px', color: '#333' }}>
                Что мы предлагаем
              </h2>
              <ul style={{ marginBottom: '20px', paddingLeft: '30px' }}>
                <li style={{ marginBottom: '10px' }}>Тысячи проверенных рецептов</li>
                <li style={{ marginBottom: '10px' }}>Поиск по категориям и настроению</li>
                <li style={{ marginBottom: '10px' }}>Подробные инструкции с пошаговыми фото</li>
                <li style={{ marginBottom: '10px' }}>Возможность сохранять любимые рецепты</li>
                <li style={{ marginBottom: '10px' }}>Сообщество единомышленников</li>
              </ul>
              
              <p style={{ marginTop: '40px', fontStyle: 'italic', color: '#777' }}>
                Присоединяйтесь к нам и откройте для себя мир вкусных открытий!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;

