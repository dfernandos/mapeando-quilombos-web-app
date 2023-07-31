// App.js
import React from 'react';
import { AuthProvider } from './AuthContext';
import RoutesApp from './router';
function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
}

export default App;
