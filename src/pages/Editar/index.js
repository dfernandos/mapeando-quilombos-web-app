import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';
import Breadcrumb from '../../components/Breadcrumb';
import './style.css'


function EditarTerritory() {
  const [territoryId, setTerritoryId] = useState(null);
  const breadcrumbItems = [
    { label: 'Gestão de Conteudo', link: '/GestaoConteudo' },
    { label: 'Editar', link: null },
  ];

  useEffect(() => {
    // Obter o territoryId a partir dos parâmetros de rota ou de algum estado
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    setTerritoryId(id);
  }, []);

  return (
    <div className='container'>
      <h1>Editar Território</h1>
      <Breadcrumb items={breadcrumbItems} />

      <Form territoryId={territoryId} />
    </div>
  );
}

export default EditarTerritory;
