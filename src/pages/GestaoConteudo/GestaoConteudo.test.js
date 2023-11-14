import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GestaoConteudo from '.';


// Mock the api module
jest.mock('../../Api', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  delete: jest.fn(() => Promise.resolve()),
}));

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
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

test('renders the content correctly', async () => {
  // Mock data to be returned from the API
  const mockTerritories = [
    {
      id: '1',
      name: 'Territory 1',
      mainImage: 'mocked-base64-image',
      briefDescription: '<p>Mocked description</p>',
    },
  ];


  // Set the mock implementation for the get function in the Api module
  require('../../Api').get.mockImplementation(() => Promise.resolve({ data: mockTerritories }));

  render(<GestaoConteudo />);

  // Wait for the loading spinner to disappear
  await waitFor(() => {
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('Territory 1')).toBeInTheDocument();
  });

  expect(screen.getByText('Lista de Territorios Quilombolas')).toBeInTheDocument();

});
