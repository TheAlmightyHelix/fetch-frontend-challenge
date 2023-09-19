import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  render(<App />);
})

test('renders landing screen on app startup', () => {
  const appName = screen.getByText(/Paw Finder/i);
  expect(appName).toBeInTheDocument();
});

test('successful log in takes the user to the DogList page', async () => {
  // log in
  const nameInput: HTMLInputElement = screen.getByPlaceholderText(/name/i)
  const emailInput: HTMLInputElement = screen.getByPlaceholderText(/email/i)
  nameInput.value = 'asdf'
  emailInput.value = 'asfd@googl.io'
  const loginBtn = screen.getByText(/Let's/i)
  expect(loginBtn).toBeInstanceOf(HTMLButtonElement)
  act(() => {
    loginBtn.click()
  })
  const authError = document.getElementById('auth-validation-error')
  expect(authError?.innerText).toBeUndefined()

  await waitFor(() => {

    // check for DogList page
    const magGlass = screen.getByText(/🔎/)
    expect(magGlass).toBeInTheDocument()
  })

})

