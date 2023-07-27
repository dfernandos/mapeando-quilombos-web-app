import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TerritorioDetalhes from '../../components/TerritorioDetalhes';
import './style.css'
import api from '../../Api';
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
    return <div className='container'>
      <h1>Não há conteúdo para este teritório</h1>
    </div>;
  }

  return (
    <div>
      <TerritorioDetalhes territory={territory} /> {/* Pass the 'territory' data here */}
    </div>
  );
}

export default Territorio;
