import React, { PropsWithChildren, useRef, useState } from "react";
import { SORTING_ORDER_OPTIONS, SORT_BY_OPTIONS } from "../lib/constants";
import { textboxStyle, interactableColors, typography, cardBaseStyle } from "../lib/styles";
import { SearchCriteriaT, SortByT, SortingOrderT } from "../lib/types";
import Button from "./atomic/Button";
import RadioOptions from "./atomic/RadioOptions";
import BreedSelector from "./BreedSelector";

type SearchCriteriaProps = {
    setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteriaT>>
}

export default function SearchCriteria({ setSearchCriteria }: PropsWithChildren<SearchCriteriaProps>) {
    const [breeds, setBreeds] = useState<string[]>()
    const zipRef = useRef<HTMLInputElement>(null)
    const minAgeRef = useRef<HTMLInputElement>(null)
    const maxAgeRef = useRef<HTMLInputElement>(null)
    const [sortBy, setSortBy] = useState<SortByT>('breed')
    const [sortingOrder, setSortingOrder] = useState<SortingOrderT>('asc')
    const [validationError, setValidationError] = useState('')

    const searchDogs = () => {
        const ageMin = minAgeRef.current?.value
        const ageMax = maxAgeRef.current?.value
        const zipCodes = zipRef.current?.value.split(',').map(e => e.trim()).filter(e => e)

        // validations
        if (zipCodes && !zipCodes.every(zip => /^\d{5}$/.test(zip))) {
            setValidationError('each zip code has to be a 5-digit number')
            return
        }

        if (ageMin && parseFloat(ageMin) < 0) {
            setValidationError('age can\'t be negative')
            return
        }

        if ((ageMax && !Number.isInteger(parseFloat(ageMax))) || (ageMin && !Number.isInteger(parseFloat(ageMin)))) {
            setValidationError('please enter ages as integers')
            return
        }

        if ((minAgeRef.current?.valueAsNumber ?? 0) > (maxAgeRef.current?.valueAsNumber ?? 0)) {
            setValidationError('minimum age can\'t be larger than max age')
            return
        }

        setValidationError('')

        setSearchCriteria({
            breeds: breeds,
            zipCodes: zipCodes,
            ageMin: ageMin,
            ageMax: ageMax,
            sortBy: sortBy,
            sortingOrder: sortingOrder,
        })
    }

    const updateBreedsSelection = (selections: Set<string>) => {
        setBreeds(Array.from(selections))
    }

    return (
        <>
            <div className={`fixed w-96 ${cardBaseStyle}`} onKeyDown={e => { if (e.key === 'Enter') searchDogs() }}>
                <p className={typography.heading}>
                    🔎 Search Criteria
                </p>

                <BreedSelector
                    updateBreedsSelection={updateBreedsSelection}
                />

                <input
                    ref={zipRef}
                    type='text'
                    placeholder='zip codes (e.g. 53703,53715...)'
                    className={textboxStyle}
                />
                <div className=' flex justify-between items-baseline'>
                    <input
                        ref={minAgeRef}
                        type='number'
                        step="1"
                        placeholder='min'
                        className={`w-1/3 ${textboxStyle}`}
                    />
                    <span>to</span>
                    <input
                        ref={maxAgeRef}
                        type='number'
                        step="1"
                        placeholder='max'
                        className={`w-1/3 ${textboxStyle}`}
                    />
                    <span>years old</span>
                </div>

                <RadioOptions
                    groupName="Sort by"
                    options={SORT_BY_OPTIONS}
                    selection={sortBy}
                    setSelection={setSortBy}
                />
                <RadioOptions
                    groupName="Sorting order"
                    options={SORTING_ORDER_OPTIONS}
                    selection={sortingOrder}
                    setSelection={setSortingOrder}
                />

                <div id="search-validation-error" className='text-red-500 h-4'>
                    {validationError}
                </div>

                <Button
                    additionalStyling={interactableColors.proceed}
                    onclick={searchDogs}
                >
                    SEARCH
                </Button>
            </div>
        </>
    )
}