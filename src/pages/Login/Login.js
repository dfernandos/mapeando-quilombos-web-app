import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import './index.css'; // Importe o arquivo de estilos para o Login

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
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
        </form>
      </div>
    </div>
  );
}

export default Login;
