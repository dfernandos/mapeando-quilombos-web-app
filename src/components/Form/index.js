import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

function Form({ territoryData, territoryId, onFormSubmit }) {
    const [formData, setFormData] = useState({
      name: "",
      briefDescription: "",
      history: "",
      cartografia: "",
      religion: "",
      extra_content: "",
      mainImage: null,
      map: "",
      error: '',
    });

  useEffect(() => {
    if (territoryId) {
      // Fetch the data for the specific territory using the territoryId
      axios.get(`http://localhost:8080/api/territory-svc/territory/${territoryId}`)
        .then((response) => {
          const territoryData = response.data;
          // Update the form data with the fetched territory data
          setFormData({
            name: territoryData.name || '',
            briefDescription: territoryData.briefDescription || '',
            history: territoryData.history || '',
            cartografia: territoryData.cartografia || '',
            religion: territoryData.religion || '',
            extra_content: territoryData.extra_content || '',
            mainImage: territoryData.mainImage || null,
            map: territoryData.map || '',
            error: '',
          });
        })
        .catch((error) => {
          console.error('Error fetching territory data:', error);
        });
    }
  }, [territoryId]);

  const [imagePreview, setImagePreview] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the 'file' part with the selected file
      setFormData((prevFormData) => ({
        ...prevFormData,
        mainImage: file,
      }));
  
      // Read the selected image and set the preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  

  async function handleSave(event) {
    event.preventDefault();
    setImagePreview(null)

    const { name, briefDescription, history, cartografia, religion, extra_content, mainImage, map } = formData;

    if (name && briefDescription && history && cartografia && religion && extra_content && mainImage && map) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('briefDescription', briefDescription);
      formData.append('history', history);
      formData.append('cartografia', cartografia);
      formData.append('religion', religion);
      formData.append('extra_content', extra_content);
      formData.append('file', mainImage);
      formData.append('map', map);

      try {
        if (territoryId) {
          // If territoryId is present, it means we are updating an existing territory
          await axios.put('http://localhost:8080/api/territory-svc/territory/update', formData);
          console.log('Território atualizado com sucesso!');
        } else {
          // If territoryId is not present, it means we are saving a new territory
          await axios.post('http://localhost:8080/api/territory-svc/territory/create', formData);
          console.log('Território cadastrado com sucesso!');
        }

        // Additional logic or callback can be added here if needed after successful save/update
        if (onFormSubmit) {
          onFormSubmit();
        }

        // Clear the form fields after save/update
        setFormData({
          name: "",
          briefDescription: "",
          history: "",
          cartografia: "",
          religion: "",
          extra_content: "",
          mainImage: null,
          map: "",
          error: ''
        });
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        console.error('Erro ao enviar os dados:', error.response);
      }
    } else {
      setFormData({ ...formData, error: 'Por favor, preencha todos os campos antes de enviar.' });
    }
  }

  return (
    <div className='form-container'>
      <h2>Cadastro de Território</h2>
      {formData.error && <p>{formData.error}</p>}
      <form onSubmit={handleSave} encType="multipart/form-data" className="blabla">
        <label>Nome:</label>
        <input
        type="text"
        value={formData.name} 
        onChange={(event) => setFormData({ ...formData, name: event.target.value })} // Change 'name' to 'name' here
        />
        <label>Breve Descrição:</label>
        <textarea
          rows="5" cols="50"
          type="text"
          value={formData.briefDescription}
          onChange={(event) => setFormData({ ...formData, briefDescription: event.target.value })}
        />
        <label>História:</label>
        <textarea
          rows="10" cols="100"
          type="text"
          value={formData.history}
          onChange={(event) => setFormData({ ...formData, history: event.target.value })}
        />
        <label>Cartografia:</label>
        <textarea
          rows="5" cols="50"
          type="text"
          value={formData.cartografia}
          onChange={(event) => setFormData({ ...formData, cartografia: event.target.value })}
        />
        <label>Religião:</label>
        <textarea
          rows="5" cols="50"
          type="text"
          value={formData.religion}
          onChange={(event) => setFormData({ ...formData, religion: event.target.value })}
        />
        <label>Conteúdo Extra:</label>
        <textarea
          rows="5" cols="50"
          type="text"
          value={formData.extra_content}
          onChange={(event) => setFormData({ ...formData, extra_content: event.target.value })}
        />
        <label>Imagem (capa):</label>
        <input
        type="file"
        name="file"
        onChange={handleImageChange}
        />
        {/* Show the image preview */}
        {imagePreview && (
        <img src={imagePreview} alt="Preview" className="preview" />
        )}

        {/* Display the selected image */}
        {formData.mainImage && <img src={`data:image/jpeg;base64, ${formData.mainImage}`} alt={formData.name} className="capa" />}


        <label>Imagem (Mapa):</label>
        <input
          type="text"
          value={formData.map}
          onChange={(event) => setFormData({ ...formData, map: event.target.value })}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Form;
