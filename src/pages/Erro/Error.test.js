import Erro from ".";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


test('Should show the correct message for pageNotFound', () => {
  render(<Erro />);
  
  expect(screen.getByRole("error")).toHaveTextContent('Pagina nao encontrada');
});