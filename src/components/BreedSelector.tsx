import React, { PropsWithChildren, useState } from "react";
import { interactableColors, typography } from "../lib/styles";
import Button from "./atomic/Button";
import BreedSelectorPopup from "./BreedSelectorPopup";
import { useBreedsList } from "../hooks/useBreedsList";

type BreedSelectorProps = {
    updateBreedsSelection: (selections: Set<string>) => void
}

export default function BreedSelector({ updateBreedsSelection }: PropsWithChildren<BreedSelectorProps>) {
    const breedsList = useBreedsList()
    const [displayBreedsPopup, setDisplayBreedsPopup] = useState(false)
    const [breeds, setBreeds] = useState<Set<string>>(new Set())

    const toggleBreed = (breed: string) => {
        const current = new Set<string>(breeds)
        if (breeds.has(breed)) {
            current.delete(breed)
        }
        else {
            current.add(breed)
        }
        setBreeds(current)
    }

    return (<>
        <Button
            additionalStyling={interactableColors.neutral}
            onclick={() => { setDisplayBreedsPopup(true) }}
        >
            SELECT BREEDS
        </Button>
        <div className={`${typography.caption} w-full`}>
            {Array.from(breeds).join(', ')}
        </div>
        {displayBreedsPopup && breedsList &&
            <BreedSelectorPopup
                options={breedsList}
                selections={breeds}
                toggleSelection={toggleBreed}
                closePopup={() => {
                    setDisplayBreedsPopup(false)
                    updateBreedsSelection(breeds)
                }}
                flushSelections={() => { setBreeds(new Set()) }}
            />
        }
    </>)

}