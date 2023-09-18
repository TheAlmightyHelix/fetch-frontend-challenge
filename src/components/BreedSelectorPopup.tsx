import React, { PropsWithChildren } from "react";
import { interactableColors } from "../lib/styles";
import Button from "./atomic/Button";
import PopupModal from "./atomic/PopupModal";

type BreedSelectorPopupProps = {
    options: string[]
    selections: Set<string>
    toggleSelection: (option: string) => void
    closePopup: () => void
    flushSelections: () => void
}

export default function BreedSelectorPopup({ options, selections, toggleSelection, flushSelections, closePopup }: PropsWithChildren<BreedSelectorPopupProps>) {

    return (
        <PopupModal
            title="Breeds"
            close={closePopup}
        >
            <div className='flex flex-row flex-wrap gap-2'>
                {options?.map((option) => (
                    <Button
                        additionalStyling={interactableColors.neutral}
                        onclick={() => { toggleSelection(option) }}
                        isOn={selections.has(option)}
                    >
                        {option}
                    </Button>
                ))}
            </div>
            <div className={`flex flex-row justify-end`}>
                <Button
                    additionalStyling={interactableColors.proceed}
                    onclick={flushSelections}
                >
                    CLEAR SLECETIONS
                </Button>
            </div>
        </PopupModal>
    )
}