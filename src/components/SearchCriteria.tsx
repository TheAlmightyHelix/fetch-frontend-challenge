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
        // validations
        if ((minAgeRef.current?.valueAsNumber ?? 0) < 0) {
            setValidationError('age can\'t be negative')
            return
        }

        if ((minAgeRef.current?.valueAsNumber ?? 0) > (maxAgeRef.current?.valueAsNumber ?? 0)) {
            setValidationError('minimum age can\'t be larger than max age')
            return
        }

        setValidationError('')

        const criteria: SearchCriteriaT = {
            breeds: breeds,
            zipCodes: zipRef.current?.value.split(',').map(e => e.trim()).filter(e => e),
            ageMin: minAgeRef.current?.value,
            ageMax: maxAgeRef.current?.value,
            sortBy: sortBy,
            sortingOrder: sortingOrder,
        }

        setSearchCriteria(criteria)
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
                        placeholder='min'
                        className={`w-1/3 ${textboxStyle}`}
                    />
                    <span>to</span>
                    <input
                        ref={maxAgeRef}
                        type='number'
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

                <div className='text-red-500 h-4'>
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