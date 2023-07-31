import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Header from './components/Header';
import Cadastrar from './pages/Cadastrar';
import Erro from './pages/Erro';
import Territorio from './pages/Territorio';
import GestaoConteudo from './pages/GestaoConteudo';
import EditarTerritory from './pages/Editar';
import { useAuth } from './AuthContext'; // Import useAuth hook
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute';


function RoutesApp() {
  const { isLoggedIn } = useAuth(); // Get the isLoggedIn state using the useAuth hook

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Erro />} />
          <Route path="/cadastro" element={<ProtectedRoute element={<Cadastrar />} />} />
          <Route path="/editar" element={<ProtectedRoute element={<EditarTerritory />} />} />
          <Route path="/territorio/:id" element={<Territorio />} />
          {isLoggedIn && ( // Render the protected route conditionally
            <Route path="/GestaoConteudo" element={<GestaoConteudo />} />
          )}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default RoutesApp;
