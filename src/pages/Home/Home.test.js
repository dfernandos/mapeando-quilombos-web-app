import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.'; 
import '@testing-library/jest-dom/extend-expect';


// Mock the Map component
jest.mock('../../components/Map', () => require('../../__mocks__/Map'));

test('renders the landing page with the correct title', () => {
  render(<Home />);
  
  // Check if the title is rendered correctly
  expect(screen.getByRole("pageTitle")).toHaveTextContent('Mapa dos Quilombos de Porto Alegre');

  // Check if the mock map is rendered
  expect(screen.getByTestId('mock-map')).toBeInTheDocument();
});
