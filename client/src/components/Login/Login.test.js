import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Login from './Login';

import '@testing-library/jest-dom';

describe('Dashboard Component', () => {
  test('it should render the login component', () => {
    render(<Login />, { wrapper: BrowserRouter });

    const navbar = screen.getByRole('heading', { name: /log in/i });

    expect(navbar).toBeInTheDocument;
  });
});
