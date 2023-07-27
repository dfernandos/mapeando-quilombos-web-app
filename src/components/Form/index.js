import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Api';


function Form({ territoryData, territoryId, onFormSubmit }) {
  const navigate = useNavigate(); 

  const [isActionSuccess, setIsActionSuccess] = useState(false);

    const [formData, setFormData] = useState({
      name: "",
      briefDescription: "",
      history: "",
      cartografia: "",
      religion: "",
      extra_content: "",
      mainImage: null,
      map: "",
      error: "",
    });
  

    useEffect(() => {
      if (isActionSuccess) {
        toast.success('Território cadastrado com sucesso!');
        setIsActionSuccess(false); // Reseta o estado para evitar que o toast seja exibido novamente ao navegar entre páginas
      }
    }, [isActionSuccess]);
  
    useEffect(() => {
      if (territoryId) {
        // Fetch the data for the specific territory using the territoryId
        api
          .get(`/territory/${territoryId}`)
          .then((response) => {
            const territoryData = response.data;
            // Update the form data with the fetched territory data
            setFormData({
              name: territoryData.name || "",
              briefDescription: territoryData.briefDescription || "",
              history: territoryData.history || "",
              cartografia: territoryData.cartografia || "",
              religion: territoryData.religion || "",
              extra_content: territoryData.extra_content || "",
              mainImage: territoryData.mainImage || null,
              map: territoryData.map || "",
              error: "",
            });
          })
          .catch((error) => {
            console.error("Error fetching territory data:", error);
          });
      }
    }, [territoryId]);
  
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
      {formData.error && <p className='error'>{formData.error} {window.scrollTo(0, 0)}</p>}
      <form onSubmit={handleSave} encType="multipart/form-data">
      <label> Nome:</label>
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
        {imagePreview && <img src={imagePreview} alt="Preview" className="preview" />}
        {/* Display the selected image */}
        {formData.mainImage && !imagePreview && (
          <img src={`data:image/jpeg;base64, ${formData.mainImage}`} alt={formData.name} className="capa" />
        )}
        <label>Imagem (Mapa):</label>
        <input
          type="text"
          value={formData.map}
          onChange={(event) => setFormData({ ...formData, map: event.target.value })}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default Form;
