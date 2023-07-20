/**
 * @jest-environment jsdom
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../client/App.jsx';

describe('Testing the page layouts', () => {
  test('renders the landing page', () => {
    const test = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(test.getByText("Cohort: CTRI 17")).toBeTruthy();
    expect(test.getByText("Cohort: CTRI 17")).toBeTruthy();
    console.log('yes');
  });
})
