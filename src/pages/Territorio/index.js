import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TerritorioDetalhes from '../../components/TerritorioDetalhes';
import './style.css';
import api from '../../Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Territorio() {
  const [territory, setTerritory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/territory/${id}`)
      .then((response) => {
        setTerritory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching territory data:", error);
      });
  }, [id]);

  if (!territory) {
    return (
      <div className='container'>
        <h2>Carregando... <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#a06b6b" }} /></h2>
      </div>
    );
  }

  return (
    <div>
      <TerritorioDetalhes territory={territory} /> {/* Pass the 'territory' data here */}
    </div>
  );
}

export default Territorio;
