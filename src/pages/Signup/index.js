import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import './index.css'; // Import the Signup.css stylesheet
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // State para mensagens de erro

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!email || !password || !confirmPassword) {
      setError('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log('User created successfully');

      // Exibir o toast de sucesso
      toast.success('Cadastro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000, // Fechar automaticamente após 3 segundos
      });

      // Limpar os campos do formulário
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null); // Limpar mensagem de erro
    } catch (error) {
      console.error('Signup error:', error.message);
      setError('*Erro ao realizar o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className='signup-title'>Cadastro de usuário</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostra mensagem de erro */}
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="signup-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
