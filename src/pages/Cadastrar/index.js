import React from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../../components/Form';

function Cadastrar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const territoryId = searchParams.get('id');

  return (
    <div>
      <Form territoryId={territoryId} />
    </div>
  );
}

export default Cadastrar;
