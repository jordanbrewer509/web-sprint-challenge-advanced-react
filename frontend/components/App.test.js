import React from 'react';

import AppClass from './AppClass';
import AppFunctional from './AppFunctional';
import { render, fireEvent, screen } from '@testing-library/react';

  test('sanity', () => {
    expect(true).toBe(true)
  })

  test('AppFunctional renders without errors', () => {
    render(<AppFunctional />)
  })
  test('Title card renders to the dom', () => {
    render(<AppFunctional />)
    const coordinateDisplay = screen.getByText('Coordinates (2, 2)')
    expect(coordinateDisplay).toBeTruthy();
  })
  test('Directional buttons exist', () => {
    render(<AppFunctional />)
    const upBtnF    = screen.getByText('UP');
    const leftBtnF  = screen.getByText('LEFT');
    const downBtnF  = screen.getByText('DOWN');
    const rightBtnF = screen.getByText('RIGHT');
    const resetBtnF = screen.getByText('reset');

    expect(upBtnF).toBeTruthy();
    expect(leftBtnF).toBeTruthy();
    expect(downBtnF).toBeTruthy();
    expect(rightBtnF).toBeTruthy();
    expect(resetBtnF).toBeTruthy();
  })

  test('App Functional directional buttons work', () => {
    render(<AppFunctional />)
    const upBtnF    = screen.getByText('UP');
    const leftBtnF  = screen.getByText('LEFT');
    const downBtnF  = screen.getByText('DOWN');
    const rightBtnF = screen.getByText('RIGHT');

    fireEvent.click(upBtnF)
    fireEvent.click(leftBtnF)
    fireEvent.click(downBtnF)
    fireEvent.click(downBtnF)
    fireEvent.click(rightBtnF)
    const coordinatesAfterMove = screen.getByText('Coordinates (2, 3)')
    expect(coordinatesAfterMove).toBeTruthy();
  })

  test('App Functional reset button works', () => {
    render(<AppFunctional />)
    const upBtnF = screen.getByText('UP');
    const resetBtnF = screen.getByText('reset');
    
    fireEvent.click(upBtnF);
    
    const coordinatesAfterMove = screen.getByText('Coordinates (2, 1)')

    expect(coordinatesAfterMove).toBeTruthy();

    fireEvent.click(resetBtnF);

    const coordinatesAfterReset = screen.getByText('Coordinates (2, 2)')

    expect(coordinatesAfterReset).toBeTruthy();
  })

  test('App Class renders without errors', () => {
    render(<AppClass />)
  })

  test('App Class directional buttons work', () => {
    render(<AppClass />)
    const upBtnC    = screen.getByText('UP');
    const leftBtnC  = screen.getByText('LEFT');
    const downBtnC  = screen.getByText('DOWN');
    const rightBtnC = screen.getByText('RIGHT');

    fireEvent.click(upBtnC)
    fireEvent.click(leftBtnC)
    fireEvent.click(downBtnC)
    fireEvent.click(downBtnC)
    fireEvent.click(rightBtnC)
    const coordinatesAfterMove = screen.getByText('Coordinates (2, 3)')
    expect(coordinatesAfterMove).toBeTruthy();
  })

  test('App Class reset button works', () => {
    render(<AppClass />)
    const upBtnC = screen.getByText('UP');
    const resetBtnC = screen.getByText('reset');
    
    fireEvent.click(upBtnC);
    
    const coordinatesAfterMove = screen.getByText('Coordinates (2, 1)')

    expect(coordinatesAfterMove).toBeTruthy();

    fireEvent.click(resetBtnC);

    const coordinatesAfterReset = screen.getByText('Coordinates (2, 2)')

    expect(coordinatesAfterReset).toBeTruthy();
  })