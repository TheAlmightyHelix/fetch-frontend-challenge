
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import LandingPage from "./LandingPage"

beforeEach(() => {
    render(<LandingPage />)
})

test('attempt to log in with missing credentials yields erorr message', () => {
    const loginBtn: HTMLButtonElement = screen.getByText(/Let's/i)

    act(() => {
        loginBtn.click()
    })

    const validationErrorMsg = screen.getByText(/please enter your name and email/i);
    expect(validationErrorMsg).toBeInTheDocument();
})