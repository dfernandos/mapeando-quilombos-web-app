import React, { Component } from 'react';
import './style.css'
import axios from 'axios';


class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: "",
            briefDescription: "",
            history: "",
            cartografia: "",
            religion: "",
            extra_content: "",
            mainImage: null,
            map: "",
            error: ''
        };
    };

    handleSave= async () => {
        const { nome, briefDescription, history, cartografia, religion, extra_content, mainImage, map} = this.state;
    
        if (nome && briefDescription && history && cartografia && religion
            && extra_content && mainImage&& map) {
          const formData = new FormData();
          formData.append('name', nome);
          formData.append('briefDescription', briefDescription);
          formData.append('history', history);
          formData.append('cartografia', cartografia);
          formData.append('religion', religion);
          formData.append('extra_content', extra_content);
          formData.append('file', mainImage);
          formData.append('map', map);
    
          try {
            await axios.post('http://localhost:8080/api/territory-svc/territory/create', formData);
            console.log('Dados enviados com sucesso!');
            // Limpar o formulário após o envio
            this.state = {
                nome: "",
                briefDescription: "",
                history: "",
                cartografia: "",
                religion: "",
                extra_content: "",
                mainImage: null,
                map: "",
                error: ''
            };
          } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            console.error('Erro ao enviar os dados:', error.response);
          }
        } else {
          console.error('Por favor, preencha todos os campos antes de enviar.');
        }
      };

// ...
        render() {
            return (
                <div className='blabla'>
                    <h2>Cadastro de Território</h2>

                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.handleSave} encType="multipart/form-data" className="blabla">
                    <label>Nome:</label>
                        <input
                            type="text"
                            value={this.state.nome}
                            onChange={(event) => this.setState({ nome: event.target.value })}
                        />
                        <label>Breve Descrição:</label>
                        <input
                            type="text"
                            value={this.state.briefDescription}
                            onChange={(event) => this.setState({ briefDescription: event.target.value })}
                        />
                        <label>História:</label>
                        <input
                            type="text"
                            value={this.state.history}
                            onChange={(event) => this.setState({ history: event.target.value })}
                        />
                        <label>Cartografia:</label>
                        <input
                            type="text"
                            value={this.state.cartografia}
                            onChange={(event) => this.setState({ cartografia: event.target.value })}
                        />
                        <label>Religião:</label>
                        <input
                            type="text"
                            value={this.state.religion}
                            onChange={(event) => this.setState({ religion: event.target.value })}
                        />
                        <label>Conteúdo Extra:</label>
                        <input
                            type="text"
                            value={this.state.extra_content}
                            onChange={(event) => this.setState({ extra_content: event.target.value })}
                        />
                        <label>Imagem (capa):</label>
                        <input
                            type="file"
                            onChange={(event) => this.setState({ mainImage: event.target.files[0] })}
                        />
                        <label>Imagem (Mapa):</label>
                        <input
                            type="text"
                            value={this.state.map}
                            onChange={(event) => this.setState({ map: event.target.value })}
                        />
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            );
        }
// ...

}

export default Form;