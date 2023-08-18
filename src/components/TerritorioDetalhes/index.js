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
          <h3>Descrição</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.briefDescription }}></div>
          <h3>História</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.history }}></div>
          {territory.extra_content && ( // Check if territory.extra_content has a value
            <>
              <h3 className="extra-content-toggle" onClick={toggleExtraContent}>
                Conteúdo Extra
              </h3>
              {showExtraContent && (
                <div className="extra-content active">
                  <div dangerouslySetInnerHTML={{ __html: territory.extra_content }}></div>
                </div>
              )}
            </>
          )}
          <h3>Cartografia</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.cartografia }}></div>
          <h3>Religião</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.religion }}></div>
          <h3>Referências</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.reference }}></div>
        </div>
      </div>
    </div>
  );
}

export default TerritorioDetalhes;
