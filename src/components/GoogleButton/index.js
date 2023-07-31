import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';

function GoogleButton() {
  const { setIsLoggedIn } = useAuth();
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    var decoded = jwt_decode(credentialResponse.credential);
    console.log(decoded);
    setUser(decoded);
    setIsLoggedIn(true); // Atualiza o estado de isLoggedIn para true
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="container">
      <GoogleOAuthProvider clientId="656830742183-kucsp7jm29fr980eq6n5r9pn2n4jj064.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </GoogleOAuthProvider>

      {user && (
        <div style={{ textAlign: 'center' }}>
          <h1>User Information</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Exiba outras informações do usuário, se necessário */}
        </div>
      )}
    </div>
  );
}

export default GoogleButton;
