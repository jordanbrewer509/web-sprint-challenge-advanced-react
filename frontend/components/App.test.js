import AppClass from './AppClass';
import AppFunctional from './AppFunctional';
import { render, fireEvent, screen } from '@testing-library/react';

[AppFunctional, AppClass].forEach((component, index) => {
  const testId = index === 0 ? 'Functional' : 'Class'


  test('sanity', () => {
    expect(true).toBe(true)
  })

  describe('Functional app renders properly', () => {
    test('(Welcome to the GRID) renders to the dom', () => {
      render(<AppFunctional />)
      expect(`Welcome to the GRID`).toBeInTheDocument();
    })
  })

})