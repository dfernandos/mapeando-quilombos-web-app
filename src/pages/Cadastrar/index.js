import React from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../../components/Form';
import './style.css'
import Breadcrumb from '../../components/Breadcrumb';

function Cadastrar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const territoryId = searchParams.get('id');

  const breadcrumbItems = [
    { label: 'Gestão de Conteudo', link: '/GestaoConteudo' },
    { label: 'Cadastrar', link: null },
  ];

  return (
    <div className='container'>
      <Breadcrumb items={breadcrumbItems} />
      <h1 tabIndex="0">Cadastrar Território</h1>
      <Form territoryId={territoryId} />
    </div>
  );
}

export default Cadastrar;
