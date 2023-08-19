import { Link } from 'react-router-dom';
import useAuth from '../../useAuth'; // Import the useAuth hook
import './style.css';

function Header() {
  const { user } = useAuth(); // Use the useAuth hook to get the user

  return (
    <header>
      <div className="menu">
        <Link to="/" tabIndex="1">Home</Link>
        {user && ( // Render the link only if the user is logged in
          <Link to="/GestaoConteudo" tabIndex="2">Gestão de Conteúdo</Link>
        )}
        <Link to="/sobre" tabIndex="3">Sobre</Link>
        <Link to="/contato" tabIndex="4">Contato</Link>
        {user && ( // Render the link only if the user is logged in
          <Link to="/signup" tabIndex="5">Cadastrar usuário</Link>
        )}
        <Link to="/login" tabIndex="6">Login</Link>
      </div>
    </header>
  );
}

export default Header;
