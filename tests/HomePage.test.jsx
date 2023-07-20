/**
 * @jest-environment jsdom
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

import App from '../client/App.jsx';

describe('Testing the page layouts', () => {

  let app;
  beforeEach(() => {
    app = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  })

  // You have to comment out rehypeRaw from helper-functions.js and remove it from the react-markdown plugins key to get most of these tests to work
  test('Renders the home page', () => {
    expect(app.getByText('Cohort: CTRI 17')).toBeTruthy();
    expect(app.getByText('+ ADD TECH')).toBeTruthy();
    expect(app.getByPlaceholderText('Search APIs...')).toBeTruthy();
  });

  test('Renders make tech form when clicking the button', async () => {
    const button = screen.getByText('+ ADD TECH');

    await userEvent.click(button);
    expect(screen.getByText('Add Tech')).toBeTruthy();
    expect(screen.getByPlaceholderText('Add API Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Add API URL')).toBeTruthy();
    expect(screen.getByPlaceholderText('Add Brief Description')).toBeTruthy();
    expect(screen.getByPlaceholderText('Add Image URL')).toBeTruthy();
    expect(screen.getByText('Submit!')).toBeTruthy();
  })

  test('Renders the tiles containing each tech info', async () => {

    // This is set up for mock data in Home.jsx
    expect(screen.getByText('Google Maps API')).toBeTruthy();
    expect(screen.getByText('Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.')).toBeTruthy();
    expect(screen.getByText('Posts')).toBeTruthy();
  });
})
