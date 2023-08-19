import { Link } from 'react-router-dom';
import './style.css';
import { auth } from '../../firebaseConfig';
import useAuth from '../../useAuth';

function Header() {
  const { user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault(); // Evitar o comportamento padrão do link
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <header>
      <div className="menu">
        <Link to="/" tabIndex="1">Home</Link>
        {user && (
          <Link to="/GestaoConteudo" tabIndex="2">Gestão de Conteúdo</Link>
        )}
        <Link to="/sobre" tabIndex="3">Sobre</Link>
        <Link to="/contato" tabIndex="4">Contato</Link>
        {user && (
          <Link to="/signup" tabIndex="5">Cadastrar usuário</Link>
        )}
        {user ? (
          <a href="/" onClick={handleLogout} tabIndex="6">Sair</a> 
        ) : (
          <Link to="/login" tabIndex="6">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
