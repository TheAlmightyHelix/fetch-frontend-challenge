import React, { PropsWithChildren } from "react";
import { interactableColors, rowStyle } from "../lib/styles";
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
            <div className='flex flex-row flex-wrap gap-2 h-5/6 overflow-auto'>
                {options?.map((option) => (
                    <Button
                        key={option}
                        additionalStyling={interactableColors.neutral}
                        onclick={() => { toggleSelection(option) }}
                        isOn={selections.has(option)}
                    >
                        {option}
                    </Button>
                ))}
            </div>
            <div className={rowStyle}>
                <Button
                    additionalStyling={interactableColors.warning}
                    onclick={flushSelections}
                >
                    CLEAR SELECTIONS
                </Button>
                <Button
                    additionalStyling={interactableColors.proceed}
                    onclick={closePopup}
                >
                    DONE
                </Button>
            </div>
        </PopupModal>
    )
}