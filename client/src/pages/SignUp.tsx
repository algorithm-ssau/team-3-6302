import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiService from '../services/api';
import './Auth.css';

function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiService.signup(fullName, email, password);
      
      // Сохраняем данные пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Отправляем событие для обновления Header
      window.dispatchEvent(new Event('userChanged'));
      
      // Перенаправляем на главную
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при регистрации');
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
            
            <h2 className="auth-title">SIGN UP</h2>
            
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="auth-error">{error}</div>}
              
              <div className="auth-input-group">
                <FaUser className="auth-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
              
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
                  minLength={6}
                  className="auth-input"
                />
              </div>
              
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Регистрация...' : 'Sign up'}
              </button>
              
              <div className="auth-terms">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="auth-link">
                  Terms & Conditions
                </Link>
              </div>
              
              <div className="auth-footer">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Login
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

export default SignUp;

