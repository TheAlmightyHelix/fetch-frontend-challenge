import React, { PropsWithChildren, useRef, useState } from "react";
import { cardBaseStyle, textboxStyle, interactableColors, typography } from "../lib/styles";
import { login } from "../api/authAPI";
import Button from "../components/atomic/Button";

type SplashProps = {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Splash({ setAuthenticated }: PropsWithChildren<SplashProps>) {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [validationError, setValidationError] = useState('')


    const authenticate = () => {
        if (!nameRef.current?.value || !emailRef.current?.value) {
            setValidationError('please enter your name and email')
            return
        }

        const data = {
            name: nameRef.current?.value,
            email: emailRef.current?.value
        }

        login(data).then(status => {
            setAuthenticated(true)
        }).catch((error) => {
            setValidationError('Unable to login. Please try again.')
        })
    }

    return (
        <div className='h-1/3 grid gap-32 grid-cols-2 items-center'>
            <div>
                <p className={typography.display}>
                    Paw Finder
                </p>
                <p className={`mt-3 ${typography.heading}`}>
                    Match with local shelter dogs
                </p>
            </div>
            <div className={`w-96 ${cardBaseStyle}`} onKeyDown={e => { if (e.key === 'Enter') authenticate() }}>
                <input ref={nameRef} type='text' placeholder='name' className={textboxStyle} />
                <input ref={emailRef} type='email' placeholder='email' className={textboxStyle} />
                <div className='text-red-500 h-4'>
                    {validationError}
                </div>
                <Button
                    additionalStyling={interactableColors.proceed}
                    onclick={authenticate}
                >
                    Let's see some dogs!
                </Button>
            </div>
        </div>
    )
}