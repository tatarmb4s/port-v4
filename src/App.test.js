import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Providers.tsx', () => ({ children }) => children);
jest.mock('./components/ParentComponent', () => () => <div>Portfolio chat</div>);
jest.mock('./components/Navbar', () => () => <nav>Navigation</nav>);
jest.mock('./components/About', () => () => null);
jest.mock('./components/Contact', () => () => null);
jest.mock('./components/Skills', () => () => null);
jest.mock('./components/Work', () => () => null);
jest.mock('./components/Hrole', () => () => null);
jest.mock('./components/TimelinecS', () => () => null);
jest.mock('./components/MaterialBar', () => () => null);
jest.mock('./components/T42', () => () => null);

test('renders the portfolio navigation and chat entry', () => {
  render(<App />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByText('Portfolio chat')).toBeInTheDocument();
});
