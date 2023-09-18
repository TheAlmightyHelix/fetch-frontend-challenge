import React, { PropsWithChildren } from "react";
import { cardBaseStyle, rowStyle, typography } from "../../lib/styles";

type PopupModalProps = {
    title: string
    close: () => void
}

export default function PopupModal({ children, title, close }: PropsWithChildren<PopupModalProps>) {
    return (
        <div className={`fixed top-0 left-0 h-screen w-screen backdrop-blur-xl z-50 flex flex-col justify-center items-center`}>
            <div className={`${cardBaseStyle} max-w-7xl`}>
                <div className={`${rowStyle}`}>
                    <p className={typography.heading}>{title}</p>
                    <button className={typography.heading} onClick={close}>✖️</button>
                </div>
                {children}
            </div>
        </div>
    )
}