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

  // eslint-disable-next-line
  const [renderedReferenceHtml, setRenderedReferenceHtml] = useState('');

  const [isActionSuccess, setIsActionSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    briefDescription: '',
    history: '',
    cartografia: '',
    religion: '',
    extra_content: '',
    mainImage: null,
    latitude: 0,
    longitude: 0,
    scratchEmbeb: '',
    reference: '',
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
            latitude: Number(territoryData.latitude) || 0,
            longitude: Number(territoryData.longitude) || 0,
            scratchEmbeb: territoryData.scratchEmbeb || '',
            reference: territoryData.reference || '',
          }));
        })
        .catch((error) => {
          console.error('Error fetching territory data:', error);
        });
    }
  }, [territoryId]);

  useEffect(() => {
    // Update the rendered HTML whenever the formData.reference changes
    setRenderedReferenceHtml(formData.reference);
  }, [formData.reference]);
  

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

    const { name, briefDescription, history, cartografia, religion, extra_content, mainImage, scratchEmbeb, reference } = formData;
    const latitude = Number(formData.latitude);
    const longitude = Number(formData.longitude);

    if (name && briefDescription && history && cartografia && religion && mainImage && typeof reference === 'string') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('briefDescription', briefDescription);
      formData.append('history', history);
      formData.append('cartografia', cartografia);
      formData.append('religion', religion);
      formData.append('extra_content', extra_content);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('file', mainImage);
      formData.append('scratchEmbeb', scratchEmbeb);
      formData.append('reference', reference);

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
          latitude: 0,
          longitude: 0,
          scratchEmbeb: "",
          reference: "",
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
      <label htmlFor="nome">Nome:<span aria-hidden="true" className="mandatory">*</span></label>
        <input
        placeholder='Digite aqui o nome do território quilombola'
          type='text'
          id="name"
          aria-required="true"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        />
        <label htmlFor="briefDescription">Breve Descrição <span aria-hidden="true" className="mandatory"><span aria-hidden="true" className="mandatory">*</span></span>:</label>
        <ReactQuill
          theme='snow'
          aria-required="true"
          value={formData.briefDescription}
          onChange={(value) => setFormData({ ...formData, briefDescription: value })}
          className="react-quill"
          aria-describedby="briefDescriptionHint"
          placeholder='Digite aqui a descrição'
          tabIndex="0"
        />
        <label htmlFor="História">História:<span aria-hidden="true" className="mandatory">*</span></label>
        <ReactQuill 
        theme='snow'
        aria-required="true"
         value={formData.history}
         onChange={(value) => setFormData({ ...formData, history: value })}
         className="react-quill"
         aria-describedby="historyHint"
        placeholder='Digite aqui a história do território quilombola'
        tabIndex="0"/>

        <label htmlFor="Cartografia">Cartografia:<span aria-hidden="true" className="mandatory">*</span></label>
        <ReactQuill
          theme='snow'
          aria-required="true"
          value={formData.cartografia}
          onChange={(value) => setFormData({ ...formData, cartografia: value })}
          className="react-quill"
          aria-describedby="historyHint"
        placeholder='Digite aqui a cartografia território quilombola'/>

        <label htmlFor="Cartografia">Religião:<span aria-hidden="true" className="mandatory">*</span></label>
        <ReactQuill 
        theme='snow' 
        aria-required="true"
        value={formData.religion} 
        onChange={(value) => setFormData({ ...formData, religion: value })} 
        className="react-quill"
        aria-describedby="ReligiaoHint"
        placeholder='Digite aqui sobre a religião do território quilombola'/>

        <label htmlFor="Conteúdo Extra">Conteúdo Extra:</label>
        <ReactQuill
        className="react-quill"
          theme='snow'
          value={formData.extra_content}
          onChange={(value) => setFormData({ ...formData, extra_content: value })
        }
        aria-describedby="conteúdoExtrahint"
        placeholder='Digite aqui sobre a religião do território quilombola'/>

        <label tmlFor="Latitude"> Latitude:<span aria-hidden="true" className="mandatory">*</span> </label>
        <input type='text' value={formData.latitude} onChange={(event) => setFormData({ ...formData, latitude: event.target.value })} aria-describedby="latitudeHint"
        placeholder='Insira aqui a latitude' aria-required="true"
        />

        <label tmlFor="Longitude"> longitude:<span aria-hidden="true" className="mandatory">*</span></label>
        <input type='text' value={formData.longitude} onChange={(event) => setFormData({ ...formData, longitude: event.target.value })} aria-describedby="longitudeHint"
        placeholder='Insira aqui a longitude' aria-required="true"
        />

        <label tmlFor="Imagem">Imagem (capa):<span aria-hidden="true" className="mandatory">*</span></label>
        <input
          type="file"
          name="file"
          aria-required="true"
          onChange={handleImageChange}
        />
        {/* Show the image preview */}
        {imagePreview && <img src={imagePreview} alt="Preview" className="preview" />}
        {/* Display the selected image */}
        {formData.mainImage && !imagePreview && (
          <img src={`data:image/jpeg;base64, ${formData.mainImage}`} alt={formData.name} className="capa" />
        )}

      <label htmlFor="embedCode">Vídeos/Conteúdos para incorporação:</label>
      <textarea
        id="embedCode"
        value={formData.scratchEmbeb}
        onChange={(event) => setFormData({ ...formData, scratchEmbeb: event.target.value })}
        placeholder="Cole o código de incorporação aqui"
      ></textarea>

      <label htmlFor="reference">Referencias:<span aria-hidden="true" className="mandatory">*</span></label>
        <ReactQuill
          className="react-quill"
          theme='snow'
          aria-required="true"
          value={formData.reference}
          onChange={(value) => setFormData({ ...formData, reference: value })}
          aria-describedby="referenciaHint"
          placeholder='Insira aqui as referencias'/>    

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
