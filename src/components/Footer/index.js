import React from 'react';
import './style.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/GestaoConteudo">Gestão de Conteúdo</a>
          <a href="/sobre">Sobre</a>
          <a href="/contato">Contato</a>
        </div>
        <p>Todos os direitos reservados &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
