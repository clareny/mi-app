import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Clareny branding', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Clareny/i });
  expect(heading).toBeInTheDocument();
});
