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

  const territoryData = {
    name: 'Territory Name',
    briefDescription: 'Brief description content...',
    history: 'History content...',
    cartografia: 'Cartografia content...',
    religion: 'Religion content...',
    extra_content: 'Extra content...',
    mainImage: 'base64-encoded-image',
    map: 'Map content...',
    // Other territory properties...
  };


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

      <Form territoryId={territoryId} territoryData={{territoryData}}/>
    </div>
  );
}

export default EditarTerritory;
