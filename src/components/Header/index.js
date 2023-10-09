import { Link } from 'react-router-dom';
import './style.css';
import { auth } from '../../firebaseConfig';
import useAuth from '../../useAuth';
import homeIcon from './images/homeIcon.png';
import loginIcon from './images/loginIcon.png';
import contactIcon from './images/contactIcon.png';
import aboutIcon from './images/aboutIcon.png';



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
      <img src={homeIcon} alt="icone do menu home" width="50" height="50" className='headerIcon'/>
      <Link to="/" tabIndex="1">Início </Link>
        {user && (
          <>
          <img src={aboutIcon} alt="icone do menu sobre" width="50" height="50" className='headerIcon'/>
          <Link to="/GestaoConteudo" tabIndex="2">Gestão de Conteúdo </Link>
          </>
        )}
        {!user && (
          <>
            <img src={aboutIcon} alt="icone do menu sobre" width="50" height="50" className='headerIcon'/>
            <Link to="/sobre" tabIndex="2">Sobre</Link>

            <img src={contactIcon} alt="icone do menu contato" width="50" height="50" className='headerIcon'/>
            <Link to="/contato" tabIndex="3">Contato </Link>
          </>
        )}
        {user && (
           <>
          <img src={contactIcon} alt="icone do menu sobre" width="50" height="50" className='headerIcon'/>
          <Link to="/signup" tabIndex="3">Cadastrar usuário </Link>
          </>
        )}
        {user ? (
          <>
            <img src={loginIcon} alt="icone do menu sair" width="50" height="50" className='headerIcon'/>
            <a href="/" onClick={handleLogout} tabIndex="4">Sair </a> 
          </>
        ) : (
          <>
            <img src={loginIcon} alt="icone do menu sair" width="50" height="50" className='headerIcon'/>
            <Link to="/login" tabIndex="4">Login </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
