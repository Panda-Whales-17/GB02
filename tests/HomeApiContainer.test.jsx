/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { HomeApiContainer } from '../client/containers/HomeApiContainer.jsx';

test('renders the landing page', () => {
  const mockedUsedNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));
  const test = render(<HomeApiContainer />);
  expect(test.getByText("Posts")).toBeTruthy();
  console.log('yes');
});