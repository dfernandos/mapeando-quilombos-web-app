import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

function GestaoConteudo() {
  const [territories, setTerritories] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to perform navigation

  useEffect(() => {
    function loadApi() {
      let url = "http://localhost:8080/api/territory-svc/territory/all";

      fetch(url)
        .then((result) => result.json())
        .then((json) => {
          console.log(json);
          setTerritories(json);
        })
        .catch((error) => console.error("Erro ao carregar os territórios:", error));
    }

    loadApi();
  }, []);

  function handleIconClick(territoryId) {
    console.log(`Ícone clicado para o território com ID: ${territoryId}`);
    // Lógica para editar o território pelo ID
    // Set the URL to navigate to the "Cadastrar" page with the territoryId as a query parameter
    navigate(`/cadastro?id=${territoryId}`, { replace: true });
  }

  function handleDeleteClick(territoryId) {
    console.log(`Ícone clicado para o território com ID: ${territoryId}`);

    // Faz a requisição DELETE para o endpoint de deleção
    axios.delete(`http://localhost:8080/api/territory-svc/territory/${territoryId}`)
      .then((response) => {
        console.log('Território deletado com sucesso!');

        // Atualiza o estado removendo o território da lista
        const updatedTerritories = territories.filter((territory) => territory.id !== territoryId);
        setTerritories(updatedTerritories);
      })
      .catch((error) => {
        console.error('Erro ao deletar o território:', error);
      });
  }

  return (
    <div className='container'>
      {territories.map((item) => {
        return (
          <article key={item.id} className='content'>
            <div className="headerItem">
              <strong className="nome">{item.name}</strong>
              <div className="button-container">
                <button onClick={() => handleIconClick(item.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                </button>
                <button onClick={() => handleDeleteClick(item.id)}>
                  <FontAwesomeIcon icon={faTrash} className="icon" />
                </button>
              </div>
            </div>
            <img src={`data:image/jpeg;base64, ${item.mainImage}`} alt={item.name} className="capa" />
            <p>{item.briefDescription}</p>
            <a className="botao" href='#'>Acessar</a>
          </article>
        );
      })}
    </div>
  );
}

export default GestaoConteudo;
