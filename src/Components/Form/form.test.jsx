import React from 'react';
import { render } from '@testing-library/react'
import Search from './Search';

describe('Search Component', () => {
  test('renders the component', () => {
    render(<Search />);
  });
});
