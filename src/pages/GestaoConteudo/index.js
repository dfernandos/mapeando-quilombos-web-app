import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CustomAlert from '../../components/CustomAlert';
import { useNavigate, Link } from 'react-router-dom';

function GestaoConteudo() {
  const [territories, setTerritories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [territoryToDelete, setTerritoryToDelete] = useState(null);


  const navigate = useNavigate();

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

  function handleEditClick(territoryId) {
    console.log(`Ícone clicado para o território com ID: ${territoryId}`);
    navigate(`/editar?id=${territoryId}`, { replace: true }); // Navega para a página de edição com o territoryId como parâmetro de rota
  }

  function handleDeleteClick(territoryId) {
    console.log(`Ícone clicado para o território com ID: ${territoryId}`);
    setShowAlert(true);
    setTerritoryToDelete(territoryId);
  }

  function handleDeleteConfirm() {
    const territoryId = territoryToDelete;
    axios.delete(`http://localhost:8080/api/territory-svc/territory/${territoryId}`)
      .then((response) => {
        console.log('Território deletado com sucesso!');
        const updatedTerritories = territories.filter((territory) => territory.id !== territoryId);
        setTerritories(updatedTerritories);
      })
      .catch((error) => {
        console.error('Erro ao deletar o território:', error);
      })
      .finally(() => {
        setShowAlert(false);
      });
  }

  function handleDeleteCancel() {
    setShowAlert(false);
    setTerritoryToDelete(null);
  }


  return (
    <div className='container'>
        <div className='header'>
        <h1>Lista de Territórios Quilombolas</h1>
        <Link to="/cadastro" className="botao">+ Adicionar</Link>
        </div>
        
      {territories.map((item) => {
        return (
          <article key={item.id} className='content'>
            <div className="headerItem">
              <strong className="nome">{item.name}</strong>
              <div className="button-container">
                <button onClick={() => handleEditClick(item.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                </button>
                <button onClick={() => handleDeleteClick(item.id)}>
                  <FontAwesomeIcon icon={faTrash} className="icon" />
                </button>
              </div>
            </div>
            <img src={`data:image/jpeg;base64, ${item.mainImage}`} alt={item.name} className="capa" />
            <p>{item.briefDescription}</p>
            <Link to={`/territorio/${item.id}`} className="botao">Acessar</Link>
  
            {showAlert && territoryToDelete === item.id && (
              <CustomAlert
                message="Tem certeza que deseja deletar este território?"
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              />
            )}
          </article>
        );
      })}
    </div>
  );
}

export default GestaoConteudo;
