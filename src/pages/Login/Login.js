import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import ForgotPassword from '../ForgotPassword/ForgotPassword.js'; // Importe o componente Esqueci Minha Senha

import './index.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State para mensagens de erro

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!email || !password) {
      setError('* Preencha todos os campos.');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully');

      const redirectTo = new URLSearchParams(location.search).get('redirectTo');
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Credenciais inválidas. Verifique seu email e senha.');
    }
  };

  // eslint-disable-next-line
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className='login-title'>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostra mensagem de erro */}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="login-button">Entrar</button>
          <button type="button" onClick={handleShowForgotPassword} className="login-button">Esqueci Minha Senha</button>
        </form>
        {showForgotPassword && <ForgotPassword />}

      </div>
    </div>
  );
}

export default Login;
