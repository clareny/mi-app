import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Services from './Services';

test('allows toggling multiple service options on and off', async () => {
  render(<Services />);

  const firstOption = screen.getByRole('button', { name: /grabación de voces/i });
  const secondOption = screen.getByRole('button', { name: /edición vocal/i });

  expect(firstOption).toHaveAttribute('aria-pressed', 'false');
  expect(secondOption).toHaveAttribute('aria-pressed', 'false');

  await userEvent.click(firstOption);
  await userEvent.click(secondOption);

  expect(firstOption).toHaveAttribute('aria-pressed', 'true');
  expect(secondOption).toHaveAttribute('aria-pressed', 'true');

  await userEvent.click(firstOption);

  expect(firstOption).toHaveAttribute('aria-pressed', 'false');
  expect(secondOption).toHaveAttribute('aria-pressed', 'true');
});
