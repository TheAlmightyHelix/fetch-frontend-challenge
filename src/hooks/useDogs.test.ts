import { waitFor, renderHook } from "@testing-library/react"
import { login } from "../api/authAPI"
import { getBreeds } from "../api/dogsAPI"
import { useDogs } from "./useDogs"


test('default search on initial load returns breeds in ascending order', async () => {
    const mockName = 'dummy'
    const mockEmail = 'dummy@foo.bar'

    const authenticated = await
        login({
            email: mockEmail,
            name: mockName
        })
    waitFor(() => {
        expect(authenticated).toBeTruthy()
    })

    const breeds: string[] = await getBreeds()
    expect(breeds).toBeInstanceOf(Array)
    const sortedBreeds = breeds.sort()

    const { result } = renderHook(() => useDogs({}))
    waitFor(() => {
        const data = result.current.data
        expect(data).toBeTruthy()
        if (data)
            expect(data[0].breed).toEqual(sortedBreeds[0])
    })
})