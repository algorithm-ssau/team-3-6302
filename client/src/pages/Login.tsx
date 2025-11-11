import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiService from '../services/api';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiService.login(email, password);
      
      // Сохраняем данные пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Отправляем событие для обновления Header
      window.dispatchEvent(new Event('userChanged'));
      
      // Перенаправляем на главную
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <button 
              className="auth-close" 
              onClick={() => navigate('/')}
              aria-label="Close"
            >
              ×
            </button>
            
            <h2 className="auth-title">LOGIN</h2>
            
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="auth-error">{error}</div>}
              
              <div className="auth-input-group">
                <FaEnvelope className="auth-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
              
              <div className="auth-input-group">
                <FaLock className="auth-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
              
              <Link to="/forgot-password" className="auth-forgot">
                Forgot Password?
              </Link>
              
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Вход...' : 'Login'}
              </button>
              
              <div className="auth-divider">
                <span>Or login with</span>
              </div>
              
              <div className="auth-social">
                <button type="button" className="auth-social-btn facebook">
                  Facebook
                </button>
                <button type="button" className="auth-social-btn google">
                  Google
                </button>
              </div>
              
              <div className="auth-footer">
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;

