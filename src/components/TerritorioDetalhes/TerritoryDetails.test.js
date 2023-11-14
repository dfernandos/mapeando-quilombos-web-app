import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TerritorioDetalhes from '.';

// Mock the html2pdf library
jest.mock('html2pdf.js', () => ({
    from: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    save: jest.fn(),
  }));

const mockTerritory = {
  name: 'Test Territory',
  mainImage: 'mocked-base64-image',
  briefDescription: '<p>Mocked brief description</p>',
  history: '<p>Mocked history</p>',
  cartografia: '<p>Mocked cartografia</p>',
  religion: '<p>Mocked religion</p>',
  extra_content: '<p>Mocked extra content</p>',
  scratchEmbeb: '<iframe src="https://www.youtube.com/embed/mock-video"></iframe>',
  reference: '<p>Mocked reference</p>',
};

test('renders TerritorioDetalhes component correctly', () => {
  render(<TerritorioDetalhes territory={mockTerritory} />);

  // Validate the presence of various content
  expect(screen.getByText('Test Territory')).toBeInTheDocument();
  expect(screen.getByText('Baixar PDF')).toBeInTheDocument();
  expect(screen.getByText('Mocked brief description')).toBeInTheDocument();
  expect(screen.getByText('Mocked history')).toBeInTheDocument();
  expect(screen.getByText('Mocked cartografia')).toBeInTheDocument();
  expect(screen.getByText('Mocked religion')).toBeInTheDocument();
  expect(screen.getByText('Mocked extra content')).toBeInTheDocument();
  expect(screen.getByText('Assista este vídeo sobre o Test Territory')).toBeInTheDocument();
  expect(screen.getByText('Mocked reference')).toBeInTheDocument();
});

// test('calls generatePDF function when "Baixar PDF" button is clicked', () => {
//     render(<TerritorioDetalhes territory={mockTerritory} />);
  
//     // Trigger the button click
//     fireEvent.click(screen.getByText('Baixar PDF'));
  
//     // Verify that the generatePDF function is called with the correct arguments
//     expect(html2pdf.from).toHaveBeenCalledTimes(1);
//     expect(html2pdf.from).toHaveBeenCalledWith(document.getElementById('toBeDownloaded'));
//     expect(html2pdf.set).toHaveBeenCalledTimes(1);
//     expect(html2pdf.set).toHaveBeenCalledWith({
//       margin: 10,
//       filename: 'territorio.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//     });
//     expect(html2pdf.save).toHaveBeenCalledTimes(1);
//   });
