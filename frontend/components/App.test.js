import React from 'react';

import AppClass from './AppClass';
import AppFunctional from './AppFunctional';
import { render, fireEvent, screen } from '@testing-library/react';

[AppFunctional, AppClass].forEach((component, index) => {
  const testId = index === 0 ? 'Functional' : 'Class'


  test('sanity', () => {
    expect(true).toBe(true)
  })
  test('AppFunctional renders without errors', () => {
    render(<AppFunctional />)
  })
  test('Title card renders to the dom', () => {
    render(<AppFunctional />)
    const domTitle = screen.getByText('Welcome to the GRID')
    expect(domTitle).toBeTruthy();
  })


  test('AppClass renders without errors', () => {
    render(<AppClass />)
  })
})