import { Link } from 'react-router-dom';
import './style.css';

function Header() {
  return (
    <header>
      <div className="menu">
        <Link to="/" tabIndex="1">Home</Link>
        <Link to="/GestaoConteudo" tabIndex="2">Gestão de Conteúdo</Link>
        <Link to="/sobre" tabIndex="3">Sobre</Link>
        <Link to="/contato" tabIndex="4">Contato</Link>
      </div>
    </header>
  );
}

export default Header;
