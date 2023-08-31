import React from 'react';
import './style.css';
import html2pdf from 'html2pdf.js';

function TerritorioDetalhes({ territory }) {
  const generatePDF = () => {
    const contentElement = document.getElementById('toBeDownloaded');
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
      <div className="territorio-info" id="toBeDownloaded">
        <div className="territorio-header">
          <div className="header-content">
            <h2>{territory.name}</h2>
            <button className="button" onClick={generatePDF}>Baixar PDF</button>
          </div>
        </div>
        <div className="territorio-text" id="territorio-content">
        <img src={`data:image/jpeg;base64, ${territory.mainImage}`} alt={territory.name} className="capa" />

          <h3>Descrição</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.briefDescription }}></div>
          <h3>História</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.history }}></div>
          <h3>Cartografia</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.cartografia }}></div>
          <h3>Religião</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.religion }}></div>
          {territory.extra_content && ( // Renderizar se territory.extra_content existe
            <>
              <h3>Conteúdo Extra</h3>
              <div dangerouslySetInnerHTML={{ __html: territory.extra_content }}></div>
            </>
          )}

          {territory.scratchEmbeb && ( // Renderizar se territory.extra_content existe
            <>
              <h3>Assista este vídeo sobre o {territory.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: territory.scratchEmbeb }}></div>
            </>
          )}

          <h3>Referências</h3>
          <div dangerouslySetInnerHTML={{ __html: territory.reference }}></div>
        </div>
      </div>
    </div>
  );
}

export default TerritorioDetalhes;
