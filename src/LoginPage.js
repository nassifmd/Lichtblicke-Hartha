import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const translations = {
  en: {
    login_heading: 'Login',
    username: 'Username',
    password: 'Password',
    login_button: 'Login',
    invalid: 'Invalid credentials'
  },
  de: {
    login_heading: 'Anmelden',
    username: 'Benutzername',
    password: 'Passwort',
    login_button: 'Einloggen',
    invalid: 'Ungültige Anmeldedaten'
  }
};

const LoginPage = () => {
  const [language, setLanguage] = useState(sessionStorage.getItem('lang') || 'en');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('lang', language);
  }, [language]);

  const t = (key) => translations[language][key];

  const handleLogin = (e) => {
    e.preventDefault();
    const validUsers = {
      tda: 'tda',
      admin: 'admin',
      hartha: 'hartha'
    };
    if (validUsers[username] === password) {
      sessionStorage.setItem('user', username);
      navigate('/form');
    } else {
      alert(t('invalid'));
    }
  };

  return (
    <div className="login-container">
      <div className="language-selector">
        <button onClick={() => setLanguage('en')}>🇬🇧 EN</button>
        <button onClick={() => setLanguage('de')}>🇩🇪 DE</button>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>{t('login_heading')}</h2>
        <input
          type="text"
          placeholder={t('username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{t('login_button')}</button>
      </form>
    </div>
  );
};

export default LoginPage;
