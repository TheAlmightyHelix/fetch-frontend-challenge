import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Paw Finder/i);
  expect(linkElement).toBeInTheDocument();
});

// inital load dogs breed sorted by ascending order


// 