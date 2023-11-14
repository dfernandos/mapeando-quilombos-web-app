import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';


// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  Link: jest.fn(),
}));

// Mock the firebaseConfig module
jest.mock('../../firebaseConfig', () => ({
  auth: {
    currentUser: {
      getIdToken: jest.fn(() => Promise.resolve('mocked-token')),
    },
  },
}));

test('renders the login component correctly', async () => {

  render(<Login />);

  // Wait for the loading spinner to disappear
  await waitFor(() => {
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByText('Esqueci Minha Senha')).toBeInTheDocument();
  });

});
