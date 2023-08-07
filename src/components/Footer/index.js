import React from 'react';
import './style.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>Todos os direitos reservados &copy; {new Date().getFullYear()}</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/GestaoConteudo">Gestão de Conteúdo</a>
          <a href="/sobre">Sobre</a>
          <a href="/contato">Contato</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
