import { useEffect, useState } from "react";
import { DogSearchResponseT, DogT, SearchCriteriaT } from "../lib/types";
import { getDogs, searchDogs } from "../api/dogsAPI";
import { BASE_URL } from "../lib/constants";

/**
 * This hook is designed to serve as the handler for multi-page dog data loading
 * It keeps track of the current '/dogs/search' response and fetches the previous or next page of dogs
 * @param searchParams 
 * @returns object containing several values and side effects (see function signatures for what each of them does)
 */
export const useDogs = (searchParams: SearchCriteriaT) => {
    const [prevURL, setPrev] = useState<string>()
    const [nextURL, setNext] = useState<string>()
    const [total, setTotal] = useState<number>()
    const [data, setData] = useState<DogT[]>();

    // perform initial search
    useEffect(() => {
        initialSearch()
    }, [searchParams])

    const initialSearch = async () => {
        const { prev, next, resultIds, total }: DogSearchResponseT = await searchDogs(searchParams)
        setPrev(prev)
        setNext(next)
        setTotal(total)
        const dogs = await getDogs(resultIds)
        setData(dogs)
    }

    /**
     * gets the next page of DogsT objects
     * @returns an array of DogsT objects of length PAGE_SIZE
     */
    const getNextPage = async () => {
        if (!hasNext()) { return false }

        const res = await fetch(BASE_URL + nextURL, {
            credentials: 'include'
        })
        const { prev, next, resultIds }: DogSearchResponseT = await res.json()

        setPrev(prev)
        setNext(next)

        const dogs = await getDogs(resultIds)
        setData(dogs)
        return dogs
    }

    /**
     * gets the previous page of DogsT objects
     * @returns an array of DogsT objects of length PAGE_SIZE
     */
    const getPrevPage = async () => {
        if (!hasPrev()) { return false }
        const res = await fetch(BASE_URL + prevURL, {
            credentials: 'include'
        })
        const { prev, next, resultIds }: DogSearchResponseT = await res.json()
        setPrev(prev)
        setNext(next)
        const dogs = await getDogs(resultIds)
        setData(dogs)
        return dogs
    }

    /**
     * checks if there is a previous page of DogT objects
     * this function is exposed to determine if the corresponding page navigation button needs to be rendered
     * @returns true if the previous page exists, false otherwise
     */
    const hasPrev = () => Boolean(prevURL)

    /**
     * checks if there is a next page of DogT objects
     * this function is exposed to determine if the corresponding page navigation button needs to be rendered
     * @returns true if the next page exists, false otherwise
     */
    const hasNext = () => {
        console.log('nextURL', nextURL)
        console.log('prevURL', prevURL)
        if (!nextURL) return false

        const from = (new URL(BASE_URL + nextURL).searchParams.get('from'))
        console.log(from, total)
        if (from && total && (parseInt(from) < total)) return true

        return false
    }

    return { hasNext, hasPrev, getNextPage, getPrevPage, total, data }
}