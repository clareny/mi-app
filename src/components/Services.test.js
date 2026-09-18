import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '../contexts/LanguageContext';
import Services from './Services';

const renderServices = () =>
  render(
    <LanguageProvider>
      <Services />
    </LanguageProvider>
  );

test('allows toggling multiple vocal blocks on and off', async () => {
  renderServices();

  const firstOption = screen.getByRole('button', { name: /grabación/i });
  const secondOption = screen.getByRole('button', { name: /edición/i });

  expect(firstOption).toHaveAttribute('aria-pressed', 'false');
  expect(secondOption).toHaveAttribute('aria-pressed', 'false');
  expect(firstOption).toHaveTextContent(/si buscás dónde grabar/i);
  expect(secondOption).toHaveTextContent(/si ya tenés las voces y solo querés algo puntual/i);

  await userEvent.click(firstOption);
  await userEvent.click(secondOption);

  expect(firstOption).toHaveAttribute('aria-pressed', 'true');
  expect(secondOption).toHaveAttribute('aria-pressed', 'true');

  await userEvent.click(firstOption);

  expect(firstOption).toHaveAttribute('aria-pressed', 'false');
  expect(secondOption).toHaveAttribute('aria-pressed', 'true');
});
