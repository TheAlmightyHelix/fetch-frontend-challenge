import React, { useContext, useEffect, useState } from "react";
import DogCard from "../components/DogCard";
import SearchCriteria from "../components/SearchCriteria";
import { DogT, SearchCriteriaT } from "../lib/types";
import { interactableColors, typography } from "../lib/styles";
import { matchDog } from "../api/dogsAPI";
import { useDogs } from "../hooks/useDogs";
import Button from "../components/atomic/Button";
import MatchPopup from "../components/MatchPopup";
import DogListInstructions from "../components/DogListInstructions";
import { AuthContext } from "../hooks/useAuth";

export default function DogList() {
    const { handleLogout } = useContext(AuthContext)
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteriaT>({})
    const [favorites, setFavorites] = useState(new Set<string>())
    const [match, setMatch] = useState<DogT | undefined>()

    const { data, total, getNextPage, getPrevPage, hasNext, hasPrev, serverError } = useDogs(searchCriteria)

    useEffect(() => {
        if (serverError === 401) {
            alert('Unable to connect to the server. Please log in again.')
            handleLogout()
        }
    }, [serverError])

    const prev = async () => {
        if (!hasPrev()) return
        await getPrevPage()
    }
    const next = async () => {
        if (!hasNext()) return
        await getNextPage()
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
            setMatch(data[0])
        })
    }


    return (
        <>
            <div className='w-full h-full flex flex-row gap-8 p-5'>
                <div className=' relative h-full w-2/3'>
                    <div className={` mb-4 h-12`}>
                        <div className={`flex flex-row justify-between items-start`}>
                            <div className={`flex flex-row items-start gap-4`}>
                                <p className={`${typography.heading}`}>
                                    {`${total ?? 'No'} results found`}
                                </p>

                                {favorites.size > 0 &&
                                    <>
                                        <Button additionalStyling={interactableColors.confirm} onclick={() => { makeMatch(favorites) }}>
                                            FIND A MATCH
                                        </Button>
                                        <Button additionalStyling={interactableColors.neutral} onclick={() => { setFavorites(new Set()) }}>
                                            CLEAR FAVORITES
                                        </Button>
                                    </>
                                }
                            </div>

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
                </div>

                <div className='relative w-96'>
                    <SearchCriteria
                        setSearchCriteria={setSearchCriteria}
                    />
                </div>

                <DogListInstructions />

            </div>
            {match &&
                <MatchPopup
                    match={match}
                    close={() => { setMatch(undefined) }}
                />}

        </>
    )
}