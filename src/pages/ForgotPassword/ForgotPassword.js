import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import './index.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Um email de recuperação de senha foi enviado para o seu endereço de email.');
    } catch (error) {
      setMessage('Houve um erro ao enviar o email de recuperação de senha. Verifique se o endereço de email está correto.');
    }
  }

  return (
    <div>
      <h2 className='forgotPassword-title'>Esqueci Minha Senha</h2>
      <p>Insira seu endereço de email e enviaremos instruções de recuperação de senha.</p>
      {message && <p>{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        className='input-field'
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword} className='forgot-button'>Enviar Email de Recuperação de Senha</button>
    </div>
  );
}

export default ForgotPassword;
