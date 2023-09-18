import React, { PropsWithChildren, useState } from "react";
import { DogT } from "../lib/types";
import { favoriteColor, oneLine, whitespaceColor } from "../lib/styles";

type DogCardProps = {
    dog: DogT,
    favorited: boolean,
    toggleFavorite: (dogId: string) => void
}

export default function DogCard({ dog, favorited, toggleFavorite }: PropsWithChildren<DogCardProps>) {

    const dogCardClick = () => {
        toggleFavorite(dog.id)
    }

    return (
        <div
            className={`${favorited ? favoriteColor : whitespaceColor} select-none rounded-md hover:rotate-1 hover:shadow-lg transition-all relative`}
            onClick={dogCardClick}
        >
            <img draggable={false} src={dog.img} className={imageStyle} />
            <div className='p-2'>
                <div className={`flex flex-row justify-between`}>
                    <span className={boldSerif}>{dog.name}</span>
                    <span>{dog.age} y.o.</span>
                </div>
                <div className={oneLine}>{dog.breed}</div>
                <div>{dog.zip_code}</div>
                {favorited && <div className={favoritedIconStyle}>🥰</div>}
            </div>
        </div>
    )
}

const imageStyle = 'w-56 h-56 rounded-md object-cover'
const boldSerif = 'font-serif font-bold'
const favoritedIconStyle = 'text-4xl absolute bottom-3 right-3'