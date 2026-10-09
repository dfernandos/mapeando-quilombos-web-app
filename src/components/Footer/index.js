import { Link } from 'react-router-dom';
import './style.css';
import useAuth from '../../useAuth';

function Footer() {
  const { user } = useAuth();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Início</Link>
          {user && <Link to="/GestaoConteudo">Gestão de Conteúdo</Link>}
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </div>
        <p>Mapeando Quilombos · Porto Alegre · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
