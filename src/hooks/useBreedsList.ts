import { useState, useMemo } from "react"
import { getBreeds } from "../api/dogsAPI"

/**
 * load and memoize the list of available dog breeds for the user's reference when performing the search
 * @returns the arrray of available dog breeds 
 */
export const useBreedsList = () => {
    const [availableBreeds, setAvailableBreeds] = useState<string[]>()
    const breedsList = useMemo(() => {
        if (availableBreeds) return availableBreeds
        getBreeds().then(data => {
            setAvailableBreeds(data)
        })

    }, [availableBreeds])

    return breedsList
}