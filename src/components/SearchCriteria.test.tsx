
import { act, render, screen } from '@testing-library/react';
import SearchCriteria from "./SearchCriteria"



describe('mal-formatted zip codes are prevented', () => {
    beforeEach(() => {
        const mockFn = jest.fn()
        render(<SearchCriteria setSearchCriteria={mockFn} />)
    })


    test('empty string - expect no error message', () => {
        const zipInput: HTMLInputElement = screen.getByPlaceholderText(/zip/i)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        zipInput.value = ''
        act(() => { searchButton.click() })
        const validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()
    })
    test('123ab - expect error message', () => {
        const zipInput: HTMLInputElement = screen.getByPlaceholderText(/zip/i)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        zipInput.value = '123ab'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/5-digit number/);
        expect(validationErrorMsg).toBeInTheDocument();
    })
    test('12345 - expect no error message', () => {
        const zipInput: HTMLInputElement = screen.getByPlaceholderText(/zip/i)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        zipInput.value = '12345'
        act(() => { searchButton.click() })
        const validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()
    })
    test('123 - expect error message', () => {
        const zipInput: HTMLInputElement = screen.getByPlaceholderText(/zip/i)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        zipInput.value = '123'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/5-digit number/);
        expect(validationErrorMsg).toBeInTheDocument();
    })
    test('12345,67890 - expect no error message', () => {
        const zipInput: HTMLInputElement = screen.getByPlaceholderText(/zip/i)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        zipInput.value = '12345,67890'
        act(() => { searchButton.click() })
        const validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()
    })
    test('12345,6 - expect error message', () => {
        const zipInput: HTMLInputElement = screen.getByPlaceholderText(/zip/i)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        zipInput.value = '12345,6'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/5-digit number/);
        expect(validationErrorMsg).toBeInTheDocument();
    })
})


describe('mal-formatted min and max ages are prevented', () => {
    beforeEach(() => {
        const mockFn = jest.fn()
        render(<SearchCriteria setSearchCriteria={mockFn} />)
    })

    test('min = 0 - expect no error message', () => {
        const minInput: HTMLInputElement = screen.getByPlaceholderText(/min/)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        minInput.value = '0'
        act(() => { searchButton.click() })
        const validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()

    })
    test('min = 1.2 - expect error message', () => {
        const minInput: HTMLInputElement = screen.getByPlaceholderText(/min/)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        minInput.value = '1.2'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/integers/);
        expect(validationErrorMsg).toBeInTheDocument();
    })

    test('max = 0 - expect no error message', () => {
        const maxInput: HTMLInputElement = screen.getByPlaceholderText(/max/)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        maxInput.value = '0'
        act(() => { searchButton.click() })
        const validationErrorMsg = document.getElementById('search-validation-error')
        expect(validationErrorMsg?.innerText).toBeUndefined()
    })

    test('max = 1.2 - expect error message', () => {
        const maxInput: HTMLInputElement = screen.getByPlaceholderText(/max/)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        maxInput.value = '1.2'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/integers/);
        expect(validationErrorMsg).toBeInTheDocument();
    })

    test('min = -5 - expect error message', () => {
        const minInput: HTMLInputElement = screen.getByPlaceholderText(/min/)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        minInput.value = '-5'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/negative/);
        expect(validationErrorMsg).toBeInTheDocument();
    })

    test('max = -5 - expect error message', () => {
        const maxInput: HTMLInputElement = screen.getByPlaceholderText(/max/)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        maxInput.value = '-5'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/negative/);
        expect(validationErrorMsg).toBeInTheDocument();
    })

    test('min = 10, max = 5 - expect error message', () => {
        const minInput: HTMLInputElement = screen.getByPlaceholderText(/min/)
        const maxInput: HTMLInputElement = screen.getByPlaceholderText(/max/)
        const searchButton: HTMLButtonElement = screen.getByText(/SEARCH/)
        minInput.value = '10'
        maxInput.value = '5'
        act(() => { searchButton.click() })
        const validationErrorMsg = screen.getByText(/greater/);
        expect(validationErrorMsg).toBeInTheDocument();
    })

    test('', () => {

    })
})