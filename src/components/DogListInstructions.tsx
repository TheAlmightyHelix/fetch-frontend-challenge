import React, { useState } from "react";
import { interactableColors } from "../lib/styles";
import Button from "./atomic/Button";
import PopupModal from "./atomic/PopupModal";

export default function DogListInstructions() {
    const [displayInstructions, setDisplayInstructions] = useState(false)

    return (
        <div>
            <Button
                additionalStyling={interactableColors.proceed}
                onclick={() => { setDisplayInstructions(true) }}
            >
                😵‍💫
            </Button>
            {displayInstructions &&
                <PopupModal
                    title="How it works"
                    close={() => { setDisplayInstructions(false) }}
                >
                    <div className="p-3">
                        <p>1. Enter some criteria to search for the type of dogs you want to adopt </p>
                        <p>2. Select the ones you might consider adopting</p>
                        <p>3. Once you are ready, click the "FIND A MATCH" button</p>
                    </div>
                </PopupModal>}
        </div>
    )
}