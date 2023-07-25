import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';

function EditarTerritory() {
  const [territoryId, setTerritoryId] = useState(null);

  useEffect(() => {
    // Obter o territoryId a partir dos parâmetros de rota ou de algum estado
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    setTerritoryId(id);
  }, []);

  return (
    <div>
      <h1>Editar Território</h1>
      <Form territoryId={territoryId} />
    </div>
  );
}

export default EditarTerritory;
