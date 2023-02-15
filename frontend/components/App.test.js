import AppClass from './AppClass';
import AppFunctional from './AppFunctional';
import { render, fireEvent, screen } from '@testing-library/react';

[AppFunctional, AppClass].forEach((component, index) => {
  const testId = index === 0 ? 'Functional' : 'Class'


  test('sanity', () => {
    expect(true).toBe(true)
  })

  describe(`App is functioning properly`) {
  render(<AppFunctional />)
    test(`${testId} Test #1 - app is rendered to the dom`, () => {
      expect(document.textContent('Welcome to the GRID')).toBeInTheDocument();
    })
    test(`${testId} Test # - `, () => {})
  }
})