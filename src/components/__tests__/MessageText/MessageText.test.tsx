import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageText from '../../MessageText/MessageText';
import { Status } from '../../../models';

test('renders message text with success case', () => {
  render(<MessageText status={Status.success} text='Loading...' />);
  const text = screen.getByText(/Loading.../i);
  expect(text).toBeInTheDocument();
});

test('renders message text with error case', () => {
  render(<MessageText status={Status.error} text='Network error' />);
  const text = screen.getByText(/Network error/i);
  expect(text).toBeInTheDocument();
});
