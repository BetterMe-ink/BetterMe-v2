import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, renderWithRouter } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import App from '../src/App'
import Navigation from '../src/Components/Navigation/Navigation'
import '@testing-library/jest-dom'

//test the nav bar transition feature
describe('Unit testing React components', () => {
  describe('Navigation Bar', () => {
    const props = {
    transition: true
    };

    // beforeAll(() => {
    //     transition = 
    // })


    test('landing on a bad page', () => {
      renderWithRouter(<App />, {route: '/something-that-does-not-match'})
      expect(screen.getByText('NOT FOUND PAGE')).toBeInTheDocument()
    });
    
  });
});