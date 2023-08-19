import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Header from './components/Header';
import Cadastrar from './pages/Cadastrar';
import Erro from './pages/Erro';
import Territorio from './pages/Territorio';
import GestaoConteudo from './pages/GestaoConteudo';
import EditarTerritory from './pages/Editar';
import Footer from './components/Footer';
import './global.css';
import Login from './pages/Login/Login';
import PrivateRoute from './privateRoute';
import Signup from './pages/Signup';

function RoutesApp() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/*" element={<Erro />} />
          <Route path="/cadastro" element={<PrivateRoute><Cadastrar /> </PrivateRoute>} />
          <Route path="/editar" element={<PrivateRoute><EditarTerritory /></PrivateRoute>} />
          <Route path="/territorio/:id" element={<Territorio />} />
          <Route path="/GestaoConteudo" element={<PrivateRoute><GestaoConteudo /> </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default RoutesApp;
