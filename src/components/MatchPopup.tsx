import React, { PropsWithChildren } from "react";
import PopupModal from "./atomic/PopupModal";
import { DogT } from "../lib/types";
import { typography } from "../lib/styles";

type MatchPopupProps = {
    match: DogT
    close: () => void
}

export default function MatchPopup({ match, close }: PropsWithChildren<MatchPopupProps>) {

    return (
        <PopupModal
            title="You got a match!"
            close={close}
        >
            <div className={`flex flex-col items-center gap-3 min-w-96`}>
                <img draggable={false} src={match.img} className={`${imageStyle} max-h-96`} />
                <div className={`flex flex-row gap-20 justify-between items-end w-full p-3`}>
                    <p className={typography.display}>{match.name}</p>
                    <div className='flex flex-col items-end'>
                        <p>{match.age} y.o.</p>
                        <p>{match.breed}</p>
                        <p>zip code {match.zip_code}</p>
                    </div>
                </div>
            </div>
        </PopupModal>
    )
}


const imageStyle = ' rounded-md object-cover'