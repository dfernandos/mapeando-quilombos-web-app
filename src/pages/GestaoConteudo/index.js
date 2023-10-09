import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CustomAlert from '../../components/CustomAlert';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Loading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Api';

function GestaoConteudo() {
  const [territories, setTerritories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [territoryToDelete, setTerritoryToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Gestão de Conteúdo', link: null },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    async function loadApi() {

      try {
        const response = await api.get('/territory/all'); 
        console.log(response.data);
        setTerritories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os territórios:", error);
        toast.error('Ocorreu um erro ao carregar os territórios. Por favor, tente novamente mais tarde.');

        setIsLoading(false);
      }
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
    api.delete(`/territory/${territoryId}`)
      .then((response) => {
        console.log('Território deletado com sucesso!');
        toast.success('Território deletado com sucesso!');
        const updatedTerritories = territories.filter((territory) => territory.id !== territoryId);
        setTerritories(updatedTerritories);
      })
      .catch((error) => {
        console.error('Erro ao deletar o território:', error);
        toast.error('Erro ao deletar o território. Por favor, tente novamente mais tarde.');

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
      <Breadcrumb items={breadcrumbItems} />
      <ToastContainer tabIndex="0"/>

      <div className='header'>
        <h1 tabIndex="0">Lista de Territorios Quilombolas</h1>
        <Link to="/cadastro" className="botao">+ Adicionar</Link>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <Loading type="spin" color="#a06b6b" />
        </div>
      ) : (
        <>
          {territories.map((item) => (
            <article key={item.id} className='content'>
              <div className="headerItem">
                <strong className="nome" tabIndex="0">{item.name}</strong>
                <div className="button-container">
                  <button onClick={() => handleEditClick(item.id)} aria-label={`Editar ${item.name}`}>
                    <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                  </button>
                  <button onClick={() => handleDeleteClick(item.id)} aria-label={`Deletar ${item.name}`}>
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </button>
                </div>
              </div>
              <img tabIndex="0" src={`data:image/jpeg;base64, ${item.mainImage}`} alt={item.name} className="capa" />
              <div dangerouslySetInnerHTML={{ __html: item.briefDescription }} tabIndex="0"></div>
              <Link to={`/territorio/${item.id}`} className="botao">Acessar</Link>

              {showAlert && territoryToDelete === item.id && (
                <CustomAlert
                  message={`Tem certeza que deseja deletar ${item.name}?`}
                  onConfirm={handleDeleteConfirm}
                  onCancel={handleDeleteCancel}
                  tabIndex="0"
                />
              )}
            </article>
          ))}
        </>
      )}
    </div>
  );

}


export default GestaoConteudo;
