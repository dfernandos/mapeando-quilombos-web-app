import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato';
import Header from './components/Header';
import Cadastrar from './pages/Cadastrar'

import Erro from './pages/Erro';
import Territorio from './pages/Territorio'

function RoutesApp(){

    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/sobre" element={ <Sobre/> }/>
                <Route path="/contato" element={ <Contato/> }/>
                <Route path="/*" element={ <Erro/> }/>
                <Route path="/cadastro" element={ <Cadastrar/> }/>
                <Route path="/territorio/:id" element={ <Territorio/> }/>
            </Routes>
        </BrowserRouter>

    )

}

export default RoutesApp;