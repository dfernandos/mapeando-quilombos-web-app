import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Form({ territoryData, territoryId, onFormSubmit }) {
  const navigate = useNavigate();

  const [renderedMapHtml, setRenderedMapHtml] = useState('');

  const [isActionSuccess, setIsActionSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    briefDescription: '',
    history: '',
    cartografia: '',
    religion: '',
    extra_content: '',
    mainImage: null,
    map: '',
    error: '',
  });

  useEffect(() => {
    if (isActionSuccess) {
      toast.success('Território cadastrado com sucesso!');
      setIsActionSuccess(false); // Reseta o estado para evitar que o toast seja exibido novamente ao navegar entre páginas
    }
  }, [isActionSuccess]);


  useEffect(() => {
    if (territoryId) {
      api
        .get(`/territory/${territoryId}`)
        .then((response) => {
          const territoryData = response.data;
          // Update the form data with the fetched territory data
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: territoryData.name || '',
            briefDescription: territoryData.briefDescription || '',
            history: territoryData.history || '',
            cartografia: territoryData.cartografia || '',
            religion: territoryData.religion || '',
            extra_content: territoryData.extra_content || '',
            mainImage: territoryData.mainImage || null,
            map: territoryData.map || '', // Initialize map if it's empty
          }));
        })
        .catch((error) => {
          console.error('Error fetching territory data:', error);
        });
    }
  }, [territoryId]);

  useEffect(() => {
    // Update the rendered HTML whenever the formData.map changes
    setRenderedMapHtml(formData.map);
  }, [formData.map]);
  

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const compressedImage = await compressImage(file); // Function to compress the image
      setFormData((prevFormData) => ({
        ...prevFormData,
        mainImage: compressedImage,
      }));

      // Read the selected image and set the preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxWidth = 800; // Defina o tamanho máximo da imagem
          let newWidth = img.width;
          let newHeight = img.height;

          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 0.8); // Defina a qualidade da imagem comprimida (0 a 1)
        };
      };
      reader.onerror = (error) => {
        console.error('Erro ao ler a imagem:', error);
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  };

  // Load the image preview when formData.mainImage changes
  useEffect(() => {
    if (formData.mainImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(formData.mainImage);
    } else if (formData.mainImage) {
      setImagePreview(`data:image/jpeg;base64, ${formData.mainImage}`);
    }
  }, [formData.mainImage]);

  async function handleSave(event) {
    event.preventDefault();
    setImagePreview(null);

    const { name, briefDescription, history, cartografia, religion, extra_content, mainImage, map } = formData;

    if (name && briefDescription && history && cartografia && religion && mainImage && typeof map === 'string') {
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
          await api.put(`/territory/update/${territoryId}`, formData);
          console.log('Território atualizado com sucesso!');
          toast.success('Território editado com sucesso!');

        } else {
          // If territoryId is not present, it means we are saving a new territory
          await api.post('/territory/create', formData);
          console.log('Território cadastrado com sucesso!');
          toast.success('Território cadastrado com sucesso!');
        }
        navigate('/GestaoConteudo');

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
          error: ""
        });
      } catch (error) {
        toast.error('Erro ao enviar os dados. Por favor, tente novamente mais tarde.');
        console.error('Erro ao enviar os dados:', error);
        console.error('Erro ao enviar os dados:', error.response);
      }
    } else {
      setFormData({ ...formData, error: 'Por favor, preencha todos os campos antes de salvar.' });
    }
  }
  

  return (
    <div className='form-container'>
      {formData.error && (
        <p className='error'>
          {formData.error}
          {window.scrollTo(0, 0)}
        </p>
      )}
      <form onSubmit={handleSave} encType='multipart/form-data'>
        <label> Nome:</label>
        <input type='text' value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
        <label>Breve Descrição:</label>
        <ReactQuill
          theme='snow'
          value={formData.briefDescription}
          onChange={(value) => setFormData({ ...formData, briefDescription: value })}
          className="react-quill"
        />
        <label>História:</label>
        <ReactQuill 
        theme='snow'
         value={formData.history}
         onChange={(value) => setFormData({ ...formData, history: value })}
         className="react-quill"/>
        <label>Cartografia:</label>
        <ReactQuill
          theme='snow'
          value={formData.cartografia}
          onChange={(value) => setFormData({ ...formData, cartografia: value })}
          className="react-quill"
        />
        <label>Religião:</label>
        <ReactQuill theme='snow' value={formData.religion} onChange={(value) => setFormData({ ...formData, religion: value })} className="react-quill"/>
        <label>Conteúdo Extra:</label>
        <ReactQuill
        className="react-quill"
          theme='snow'
          value={formData.extra_content}
          onChange={(value) => setFormData({ ...formData, extra_content: value })
        }
        />
        <label>Imagem (capa):</label>
        <input
          type="file"
          name="file"
          onChange={handleImageChange}
        />
        {/* Show the image preview */}
        {imagePreview && <img src={imagePreview} alt="Preview" className="preview" />}
        {/* Display the selected image */}
        {formData.mainImage && !imagePreview && (
          <img src={`data:image/jpeg;base64, ${formData.mainImage}`} alt={formData.name} className="capa" />
        )}

      <label>Referencias:</label>
        <ReactQuill
          className="react-quill"
          theme='snow'
          value={formData.map}
          onChange={(value) => setFormData({ ...formData, map: value })}
        />    

  <div dangerouslySetInnerHTML={{ __html: formData.map }}></div>

        <button
        type='submit'
        onClick={handleSave}
      >
        Salvar
      </button>

      </form>
    </div>
  );
}

export default Form;
