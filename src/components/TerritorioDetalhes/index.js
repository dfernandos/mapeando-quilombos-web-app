// TerritorioDetalhes.js

import React, { useState } from 'react';
import './style.css';

function TerritorioDetalhes({ territory }) {
  const [showExtraContent, setShowExtraContent] = useState(false);

  const toggleExtraContent = () => {
    setShowExtraContent(!showExtraContent);
  };

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
          <h3 className="extra-content-toggle" onClick={toggleExtraContent}>
            Conteúdo Extra:
          </h3>
          {showExtraContent && (
            <div className="extra-content active">
              <p>{territory.extra_content}</p>
            </div>
          )}
          <h3>Cartografia:</h3>
          <p>{territory.cartografia}</p>
          <h3>Religião:</h3>
          <p>{territory.religion}</p>
          <h3>Referências:</h3>
          <p>{territory.map}</p>
        </div>
      </div>
    </div>
  );
}

export default TerritorioDetalhes;
