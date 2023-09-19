import React, { PropsWithChildren } from "react";
import { buttonBaseStyle, interactableColors, selectedColor } from "../../lib/styles";

type ButtonProps = {
    onclick: () => void
    additionalStyling?: string
    isOn?: boolean
}

export default function Button({ onclick, additionalStyling, isOn, children }: PropsWithChildren<ButtonProps>) {
    return (
        <button
            className={`${buttonBaseStyle} ${isOn ? selectedColor : (additionalStyling ?? interactableColors.neutral)} `}
            onClick={onclick}
        >
            {children}
        </button>
    )
}