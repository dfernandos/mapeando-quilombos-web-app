import React from 'react';
import './style.css';

function TerritorioDetalhes({ territory }) {
  return (
    <div className="territorio-detalhes">
      <div className="territorio-info">
        <div className="territorio-header">
          <h2>{territory.name}</h2>
          <img src={`data:image/jpeg;base64, ${territory.mainImage}`} alt={territory.name} className="capa" />
        </div>
        <div className="territorio-text">
          <h3>Descrição:</h3>
          <p>{territory.briefDescription}</p>
          <h3>História:</h3>
          <p>{territory.history}</p>
          <h3>Cartografia:</h3>
          <p>{territory.cartografia}</p>
          <h3>Religião:</h3>
          <p>{territory.religion}</p>
          {
          territory.extra_content && 
          <div>
          <h3>Conteúdo Extra:</h3>
          <p>{territory.extra_content}</p>
          </div>
          }
          <h3>Referencias</h3>
          <p>{territory.map}</p>
        </div>
      </div>
    </div>
  );
}

export default TerritorioDetalhes;
