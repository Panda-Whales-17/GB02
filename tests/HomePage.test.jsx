/**
 * @jest-environment jsdom
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

import App from '../client/App.jsx';

describe('Testing the page layouts', () => {

  let app;
  beforeAll(() => {
    app = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  })

  test('Renders the home page', () => {
    expect(app.getByText("Cohort: CTRI 17")).toBeTruthy();
    expect(app.getByText("+ ADD TECH")).toBeTruthy();
    expect(app.getByPlaceholderText("Search APIs...")).toBeTruthy();
  });

  test('Renders make tech form when clicking the button', () => {
    const button = app.getByText('+ ADD TECH');

    userEvent.click(button);
    expect(app.getByText(''))
  })
})
