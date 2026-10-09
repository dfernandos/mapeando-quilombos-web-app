import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { auth } from '../../firebaseConfig';
import useAuth from '../../useAuth';
import brandIcon from './images/homeIcon.png';

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
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand">
          <img src={brandIcon} alt="" width="36" height="36" />
          <span>
            <strong>Mapeando Quilombos</strong>
            <small>Porto Alegre</small>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Principal">
          <NavLink to="/" end>Início</NavLink>
          {user ? (
            <>
              <NavLink to="/GestaoConteudo">Gestão de Conteúdo</NavLink>
              <NavLink to="/signup">Cadastrar usuário</NavLink>
              <a href="/" onClick={handleLogout}>Sair</a>
            </>
          ) : (
            <>
              <NavLink to="/sobre">Sobre</NavLink>
              <NavLink to="/contato">Contato</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
