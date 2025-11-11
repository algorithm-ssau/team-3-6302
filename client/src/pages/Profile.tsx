import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaAt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiService from '../services/api';
import './Profile.css';
import guestProfilePic from '../assets/guest-profile-pic.svg';

interface User {
  id: string;
  username: string;
  fullName?: string | null;
  email: string;
  avatarUrl?: string | null;
}

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Форма данных
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Состояния для пароля
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFullName(parsedUser.fullName || parsedUser.username || '');
      setUsername(parsedUser.username || '');
      setEmail(parsedUser.email || '');
    } catch (err) {
      console.error('Error loading user:', err);
      setError('Не удалось загрузить данные пользователя');
    } finally {
      setLoading(false);
    }
  };

  // Функция для оптимизации изображения
  const optimizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 800, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Вычисляем новые размеры с сохранением пропорций
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Не удалось создать контекст canvas'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const optimizedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(optimizedBase64);
        };
        img.onerror = () => reject(new Error('Ошибка при загрузке изображения'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Ошибка при чтении файла'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (макс 10MB до оптимизации)
    if (file.size > 10 * 1024 * 1024) {
      setError('Размер изображения не должен превышать 10MB');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setUploadingAvatar(true);

      // Всегда удаляем старое фото перед установкой нового
      if (user.avatarUrl) {
        try {
          await apiService.deleteAvatar(user.id);
        } catch (err) {
          // Игнорируем ошибку удаления, продолжаем с обновлением
          console.warn('Не удалось удалить старое фото:', err);
        }
      }

      // Оптимизируем изображение перед отправкой
      const optimizedBase64 = await optimizeImage(file);

      // Проверяем размер после оптимизации (макс 2MB для base64)
      if (optimizedBase64.length > 2 * 1024 * 1024) {
        // Если все еще слишком большое, уменьшаем качество
        const smallerBase64 = await optimizeImage(file, 600, 600, 0.6);
        const response = await apiService.updateAvatar(user.id, smallerBase64);
        const updatedUser = { ...user, ...response.user };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('userChanged'));
        setSuccess('Фото профиля успешно обновлено');
      } else {
        const response = await apiService.updateAvatar(user.id, optimizedBase64);
        const updatedUser = { ...user, ...response.user };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('userChanged'));
        setSuccess('Фото профиля успешно обновлено');
      }

      // Сбрасываем input для возможности повторной загрузки того же файла
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Error updating avatar:', err);
      setError(err.response?.data?.error || err.message || 'Ошибка при обновлении фото');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!user) return;

    if (!window.confirm('Вы уверены, что хотите удалить фото профиля?')) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      const response = await apiService.deleteAvatar(user.id);
      const updatedUser = { ...user, avatarUrl: null };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('userChanged'));
      setSuccess('Фото профиля удалено');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при удалении фото');
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;

    if (!newPassword || !confirmPassword || !currentPassword) {
      setError('Заполните все поля для изменения пароля');
      return;
    }

    if (newPassword.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Новые пароли не совпадают');
      return;
    }

    try {
      setError('');
      setSuccess('');
      await apiService.changePassword(user.id, currentPassword, newPassword);
      setSuccess('Пароль успешно изменен');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при изменении пароля');
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Обновляем профиль
      const response = await apiService.updateProfile(
        user.id,
        username !== user.username ? username : undefined,
        fullName !== (user.fullName || user.username) ? fullName : undefined,
        email !== user.email ? email : undefined
      );

      const updatedUser = { ...user, ...response.user };
      setUser(updatedUser);
      setFullName(response.user.fullName || response.user.username || '');
      setUsername(response.user.username);
      setEmail(response.user.email);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('userChanged'));
      setSuccess('Профиль успешно обновлен');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при сохранении профиля');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmMessage = 'Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.';
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setError('');
      await apiService.deleteAccount(user.id);
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('userChanged'));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при удалении аккаунта');
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Header />
        <div className="profile-main">
          <div className="profile-container">
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p>Загрузка...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-main">
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-title">Profile</h1>
            <button
              className="profile-save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Сохранение...' : 'SAVE'}
            </button>
          </div>

          {error && <div className="profile-error">{error}</div>}
          {success && <div className="profile-success">{success}</div>}

          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <img
                src={user.avatarUrl || guestProfilePic}
                alt="Profile"
                className="profile-avatar"
              />
            </div>
            <div className="profile-avatar-actions">
              <button
                className="profile-btn-primary"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
              >
                {uploadingAvatar ? 'Загрузка...' : 'Change photo'}
              </button>
              <button
                className="profile-btn-secondary"
                onClick={handleDeleteAvatar}
                disabled={uploadingAvatar}
              >
                Delete
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className="profile-form">
            <div className="profile-form-row">
              <div className="profile-form-group">
                <label className="profile-label">FULL NAME</label>
                <div className="profile-input-wrapper">
                  <FaUser className="profile-input-icon" />
                  <input
                    type="text"
                    className="profile-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label className="profile-label">USERNAME</label>
                <div className="profile-input-wrapper">
                  <FaAt className="profile-input-icon" />
                  <input
                    type="text"
                    className="profile-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-row">
              <div className="profile-form-group">
                <label className="profile-label">EMAIL</label>
                <div className="profile-input-wrapper">
                  <FaEnvelope className="profile-input-icon" />
                  <input
                    type="email"
                    className="profile-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label className="profile-label">PASSWORD</label>
                <div className="profile-input-wrapper">
                  <FaLock className="profile-input-icon" />
                  <input
                    type="password"
                    className="profile-input"
                    value="••••••••"
                    placeholder="Password"
                    disabled={true}
                    readOnly
                  />
                  {!isChangingPassword && (
                    <button
                      className="profile-change-password-link"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      Change
                    </button>
                  )}
                </div>
                {isChangingPassword && (
                  <div className="profile-password-change">
                    <input
                      type="password"
                      className="profile-input"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current Password"
                      style={{ marginBottom: '10px' }}
                    />
                    <input
                      type="password"
                      className="profile-input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      style={{ marginBottom: '10px' }}
                    />
                    <input
                      type="password"
                      className="profile-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      style={{ marginBottom: '10px' }}
                    />
                    <div className="profile-password-actions">
                      <button
                        className="profile-btn-primary"
                        onClick={handleChangePassword}
                      >
                        Save Password
                      </button>
                      <button
                        className="profile-btn-secondary"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setCurrentPassword('');
                          setNewPassword('');
                          setConfirmPassword('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="profile-signout-btn"
              onClick={handleSignOut}
            >
              Sign out →
            </button>
            <button
              className="profile-delete-btn"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

