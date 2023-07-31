import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './style.css';

function Header() {
  const { isLoggedIn, logout } = useAuth(); // Access the logout function from useAuth

  return (
    <header>
      <div className="menu">
        <Link to="/"> Home </Link>
        {isLoggedIn && <Link to="/GestaoConteudo"> Gestão de Conteúdo </Link>}
        <Link to="/sobre"> Sobre </Link>
        <Link to="/contato"> Contato </Link>
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
