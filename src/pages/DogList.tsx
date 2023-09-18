import React, { useState } from "react";
import DogCard from "../components/DogCard";
import SearchCriteria from "../components/SearchCriteria";
import { DogT, SearchCriteriaT } from "../lib/types";
import { cardBaseStyle, interactableColors, rowStyle, typography } from "../lib/styles";
import { matchDog } from "../api/dogsAPI";
import { useDogs } from "../hooks/useDogs";
import Button from "../components/atomic/Button";
import MatchPopup from "../components/MatchPopup";

export default function DogList() {
    const [dogs, setDogs] = useState<DogT[]>()
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteriaT>({})
    const [favorites, setFavorites] = useState(new Set<string>())
    const [match, setMatch] = useState<DogT | undefined>()

    const { data, total, getNextPage, getPrevPage, hasNext, hasPrev } = useDogs(searchCriteria)

    const prev = async () => {
        if (!hasPrev()) return
        const prevPage = await getPrevPage()
        setDogs(prevPage)
    }
    const next = async () => {
        if (!hasNext()) return
        const nextPage = await getNextPage()
        setDogs(nextPage)
    }

    // add and remove elements from the set of favorite dogs
    const toggleFavorite = (dogId: string) => {
        setFavorites((prev) => {
            const current = new Set(prev)
            if (current.has(dogId)) {
                current.delete(dogId)
            }
            else {
                current.add(dogId)
            }
            return current
        })
    }

    const makeMatch = (favorites: Set<string>) => {
        matchDog(
            Array.from(favorites)
        ).then(data => {
            // console.log('data', data)
            setMatch(data[0])
        })
    }


    return (
        <>
            <div className='w-full h-full flex flex-row gap-8'>
                <div className=' relative p-5 h-full w-2/3'>
                    {/* <p className={`mb-3 ${typography.heading}`}>How it works</p>
                <p className={`mb-5 ${typography.body}`}>Select the dogs you like and we will match one for you to adopt</p> */}
                    <div className={`${cardBaseStyle} mb-4`}>
                        <div className={`${rowStyle}`}>

                            <p className={`${typography.heading}`}>
                                {`${total} results found`}
                            </p>

                            <div className={` flex justify-end gap-3`}>
                                {hasPrev() &&
                                    <button className='text-3xl' onClick={prev}>⬅️</button>
                                }
                                {hasNext() &&
                                    <button className='text-3xl' onClick={next}>➡️</button>}
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-8'>
                        {
                            data?.map((dog) => (
                                <DogCard
                                    key={dog.id}
                                    dog={dog}
                                    toggleFavorite={toggleFavorite}
                                    favorited={favorites.has(dog.id)}
                                />
                            ))
                        }
                    </div>


                    {favorites.size > 0 &&
                        <div className='absolute bottom-4 w-full'>
                            <div className=' w-full flex flex-row justify-around gap-3'>
                                <Button additionalStyling={interactableColors.confirm} onclick={() => { makeMatch(favorites) }}>
                                    FIND MY MATCH
                                </Button>
                                <Button additionalStyling={interactableColors.neutral} onclick={() => { setFavorites(new Set()) }}>
                                    CLEAR FAVORITES
                                </Button>
                            </div>
                        </div>
                    }
                </div>

                <div className='relative w-96 pt-5'>
                    <SearchCriteria
                        setSearchCriteria={setSearchCriteria}
                    />
                </div>


            </div>
            {match &&
                <MatchPopup
                    match={match}
                    close={() => { setMatch(undefined) }}
                />}
        </>
    )
}