import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import Splash from './pages/Splash';

test('renders splash screen on app startup', () => {
  render(<App />);
  const appName = screen.getByText(/Paw Finder/i);
  expect(appName).toBeInTheDocument();
  // document.removeChild(<App/>)
});

describe('Authentication', () => {
  test('attempt to log in with missing credentials yields erorr message', () => {
    // setup component
    const mockFn = jest.fn()
    render(<Splash setAuthenticated={mockFn} />)
    const loginBtn: HTMLButtonElement = screen.getByText(/Let's/i)

    // perform action - login button click
    act(() => {
      loginBtn.click()
    })

    // expect error message
    const validationErrorMsg = screen.getByText(/please enter your name and email/i);
    expect(validationErrorMsg).toBeInTheDocument();
  })

  test('attempt to log out while auth cookie is missing/invalid', () => {
    // setup
    // const app = shallow(<App />)
    const app = render(<App />);
    act(() => {

    })

    const logoutBtn = screen.getByText('LOGOUT');

    act(() => {
      logoutBtn.click();
    })

    expect(alert).toBeCalled();
  })

})

test('inital load dogs breed sorted by ascending order', () => {

})