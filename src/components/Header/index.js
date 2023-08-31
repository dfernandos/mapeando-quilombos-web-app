import { Link } from 'react-router-dom';
import './style.css';
import { auth } from '../../firebaseConfig';
import useAuth from '../../useAuth';

function Header() {
  const { user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <header>
      <div className="menu">
        <Link to="/" tabIndex="1">Início <span aria-hidden="true" >|</span></Link>
        {user && (
          <Link to="/GestaoConteudo" tabIndex="2">Gestão de Conteúdo <span aria-hidden="true" >|</span></Link>
        )}
        {!user && (
          <>
            <Link to="/sobre" tabIndex="2">Sobre <span aria-hidden="true" >|</span></Link>
            <Link to="/contato" tabIndex="3">Contato <span aria-hidden="true" >|</span></Link>
          </>
        )}
        {user && (
          <Link to="/signup" tabIndex="3">Cadastrar usuário <span aria-hidden="true" >|</span></Link>
        )}
        {user ? (
          <a href="/" onClick={handleLogout} tabIndex="4">Sair </a> 
        ) : (
          <Link to="/login" tabIndex="4">Login </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
