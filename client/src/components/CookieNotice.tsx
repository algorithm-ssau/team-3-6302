import { useState, useEffect } from 'react';
import './CookieNotice.css';

function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже принято уведомление
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-notice">
      <div className="cookie-notice-content">
        <p className="cookie-notice-text">
          To ensure an optimum user experience, we use cookies to collect some user data for advertising and analytics purposes.
        </p>
        <button className="cookie-notice-button" onClick={handleAccept}>
          Got it
        </button>
      </div>
    </div>
  );
}

export default CookieNotice;

