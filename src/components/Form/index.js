import React,{Component} from 'react';

class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: "",
            content1: "",
            content2: "",
            content3: "",
            content4: "",
            error: ''
        };
        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar(event){
        const {nome, content1, content2, content3, content4} = this.state;

        if(nome !== ''&& content1 !== ''){
            alert(`Nome: ${nome}\nConteudo1: ${content1}`);
        }else{
            this.setState({error: 'Ops! Parece que está falando algo, miguu!'})
        }
        event.preventDefault();
    }
    render(){
        return(
            <div>
                <h2>Cadastro de Território</h2>

                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.cadastrar}>
                    <label>Nome:</label>
                    <input type="text" value={this.state.nome} 
                    onChange={(event) => this.setState({nome: event.target.value})}/><br/>
                    <label>Content 1:</label>
                    <input type="text" value={this.state.content1} 
                    onChange={(event) => this.setState({content1: event.target.value})}/>  <br/>              
                    <label>Content 2:</label>
                    <input type="text" value={this.state.content2} 
                    onChange={(event) => this.setState({content2: event.target.value})}/><br/>
                    <label>Content 3:</label>
                    <input type="text" value={this.state.content3} 
                    onChange={(event) => this.setState({content3: event.target.value})}/><br/>
                    <label>Content 4:</label>
                    <input type="text" value={this.state.content4} 
                    onChange={(event) => this.setState({content4: event.target.value})}/><br/>
                <button>cadastrar</button>
                </form>
            </div>
        );
    }
}

export default Form;