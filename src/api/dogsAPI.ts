import { BASE_URL, DEFAULT_SORT, PAGE_SIZE } from "../lib/constants"
import { DogIdT, MatchT, SearchCriteriaT } from "../lib/types"

/**
 * API call to get the list of avaliable breeds
 * @returns a list of avaliable breeds
 */
export const getBreeds = async () => {
    return await fetch(`${BASE_URL}/dogs/breeds`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        credentials: 'include'
    }).then(
        res => res.json()
    )
}

/**
 * API call to initiate a dog search
 * @param params search criteria
 * @returns a promise that can be resolved to a DogSearchResponseT object
 */
export const searchDogs = async (params: SearchCriteriaT) => {
    // construct URL search parameters
    const searchParams = new URLSearchParams()
    params.ageMin && searchParams.append('ageMin', params.ageMin.toString())
    params.ageMax && searchParams.append('ageMax', params.ageMax.toString())
    params.breeds?.map(breed => { searchParams.append('breeds', breed) })
    params.zipCodes?.map(zip => { searchParams.append('zipCodes', zip) })
    searchParams.append('sort', (params.sortBy && params.sortingOrder) ? `${params.sortBy}:${params.sortingOrder}` : DEFAULT_SORT)
    searchParams.append('size', PAGE_SIZE)

    console.log(searchParams.toString())

    // perform the RestAPI call
    return fetch(`${BASE_URL}/dogs/search?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        credentials: 'include'
    }).then(res => res.json())
}

/**
 * API call to get a list of dog data given dog ids
 * @param dogs an array of dog ids
 * @returns a promise that can be resolved to an array of DogT objects
 */
export const getDogs = async (dogs: DogIdT[]) => {
    return fetch(`${BASE_URL}/dogs`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(dogs),
        credentials: 'include'
    }).then(res => res.json())
}

/**
 * API call to get the dog matched for adoption
 * @param favorites a list of dog Ids
 * @returns a promise that can be resolved to a dog id
 */
export const matchDog = async (favorites: DogIdT[]) => {
    const response = await fetch(`${BASE_URL}/dogs/match`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(favorites),
        credentials: 'include'
    })
    const data: MatchT = await response.json()
    return getDogs([data.match])
}