import React, { useState } from 'react';
import './style.css';
import html2pdf from 'html2pdf.js'; // Importe a biblioteca html2pdf

function TerritorioDetalhes({ territory }) {
  const [showExtraContent, setShowExtraContent] = useState(false);

  const toggleExtraContent = () => {
    setShowExtraContent(!showExtraContent);
  };

  const generatePDF = () => {
    const contentElement = document.getElementById('territorio-content');
    const opt = {
      margin:       10,
      filename:     'territorio.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().from(contentElement).set(opt).save();
  };

  return (
    <div className="territorio-detalhes">
      <div className="territorio-info">
        <div className="territorio-header">
          <div className="header-content">
            <h2>{territory.name}</h2>
            <button className="button" onClick={generatePDF}>Baixar PDF</button>
          </div>
          <img src={`data:image/jpeg;base64, ${territory.mainImage}`} alt={territory.name} className="capa" />
        </div>
        <div className="territorio-text" id="territorio-content"> {/* Added an ID */}
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
