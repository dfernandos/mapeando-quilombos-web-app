import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/dom'

import Form from '.';


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

window.scrollTo = jest.fn();

jest.mock('../../Api', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
}));
jest.mock('../../firebaseConfig', () => ({
  auth: {
    currentUser: {
      getIdToken: jest.fn(() => Promise.resolve('mocked-token')),
    },
  },
}));

describe('Form Component', () => {
  test('submits the form with valid data', () => {
    render(<Form />);

    expect(document.querySelector('label[tmlfor="nome"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="nome"]')).toHaveTextContent('Nome:');

    expect(document.querySelector('label[tmlfor="briefDescription"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="briefDescription"]')).toHaveTextContent('Breve Descrição');

    expect(document.querySelector('label[tmlfor="História"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="História"]')).toHaveTextContent('História:');

    expect(document.querySelector('label[tmlfor="Cartografia"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="Cartografia"]')).toHaveTextContent('Cartografia:');

    expect(document.querySelector('label[tmlfor="religion"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="religion"]')).toHaveTextContent('Religião:');

    expect(document.querySelector('label[tmlfor="Conteúdo Extra"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="Conteúdo Extra"]')).toHaveTextContent('Conteúdo Extra:');

    expect(document.querySelector('label[tmlfor="Latitude"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="Latitude"]')).toHaveTextContent('Latitude:');

    expect(document.querySelector('label[tmlfor="Longitude"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="Longitude"]')).toHaveTextContent('Longitude');


    expect(document.querySelector('label[tmlfor="Imagem"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="Imagem"]')).toHaveTextContent('Imagem (capa):');


    expect(document.querySelector('label[tmlfor="embedCode"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="embedCode"]')).toHaveTextContent('Vídeos/Conteúdos para incorporação:');


    expect(document.querySelector('label[tmlfor="reference"]')).toBeInTheDocument();
    expect(document.querySelector('label[tmlfor="reference"]')).toHaveTextContent('Referencias:');
    
    fireEvent.click(screen.getByText('Salvar'));


  });
});
