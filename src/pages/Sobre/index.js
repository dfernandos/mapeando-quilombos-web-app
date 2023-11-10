import './style.css';
import React, { useEffect } from 'react';


function Sobre() {

  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.name = 'google-site-verification';
    metaTag.content = 'fmJt71uoPjLi2CosKCl6vVffazD2dgQfMRQBGxXPsl0';
    document.head.appendChild(metaTag);
    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  return (
    <div className="sobre-detalhes">
      <div className="sobre-info">
      <div className="sobre-header">
          <h1>Sobre</h1>
      </div>
          <p>
          O propósito do Mapeando Quilombos é contribuir para o compartilhamento de saberes sobre a cultura e história afro-brasileira através do 
          conhecimento sobre os territórios quilombolas da cidade de Porto Alegre/RS. Através dessa iniciativa, busca-se ampliar a compreensão e 
          valorização desses espaços, compartilhando informações relevantes e promovendo a conscientização sobre a importância histórica e cultural 
          dos quilombos na sociedade brasileira.  
        </p>

          <p>
          O público-alvo deste projeto são os professores e alunos da educação básica, bem como qualquer pessoa interessada nessa temática. 
          Por meio dessa iniciativa, os professores terão a oportunidade de ampliar seus conhecimentos sobre o tema e compartilhar essas informações 
          com os alunos em sala de aula.
          </p>

          <p>Este projeto foi criado para a disciplina de Trabalho de Conclusão II para a obtenção do grau de Tecnólogo em Sistemas para internet. </p>

          <p> <span className='role'>Aluno:</span> Daniel Oliveira <span className='role'>Contato:</span> danieldfs18@hotmail.com </p>
          <span className='role'>Instagram:</span> <a href='https://www.instagram.com/dolivveiras/' target="_blank" rel="noopener noreferrer"> Ver instagram</a>

          <p> <span className='role'>Orientadora:</span> Marcia Hafele Islabão Franco  <span className='role'>Contato:</span> marcia.franco@poa.ifrs.edu.br </p>
      </div>
      </div>
  );
}

export default Sobre;
