
import { act, render, screen } from '@testing-library/react';
import SearchCriteria from "./SearchCriteria"

describe('search criteria validations', () => {
    beforeEach(() => {
        const mockFn = jest.fn()
        render(<SearchCriteria setSearchCriteria={mockFn} />)
    })

    test('mal-formatted zip codes are prevented', () => {

        const zipInput: HTMLInputElement = screen.getByPlaceholderText(/zip/i)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)

        // valid input - expect no error message
        zipInput.value = ''
        act(() => { searchButton.click() })
        let validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()

        // invalid input - expect error message
        zipInput.value = '123ab'
        act(() => { searchButton.click() })
        validationErrorMsg = screen.getByText(/5-digit number/);
        expect(validationErrorMsg).toBeInTheDocument();

        // valid input - expect no error message
        zipInput.value = '12345'
        act(() => { searchButton.click() })
        validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()

        // invalid input - expect error message
        zipInput.value = '123'
        act(() => { searchButton.click() })
        validationErrorMsg = screen.getByText(/5-digit number/);
        expect(validationErrorMsg).toBeInTheDocument();

        // valid input - expect no error message
        zipInput.value = '12345,67890'
        act(() => { searchButton.click() })
        validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()

        // invalid input - expect error message
        zipInput.value = '12345,6'
        act(() => { searchButton.click() })
        validationErrorMsg = screen.getByText(/5-digit number/);
        expect(validationErrorMsg).toBeInTheDocument();
    })

})
