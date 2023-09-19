import React, { useContext, useRef, useState } from "react";
import { cardBaseStyle, textboxStyle, interactableColors, typography } from "../lib/styles";
import Button from "../components/atomic/Button";
import { AuthContext } from "../hooks/useAuth";


export default function LandingPage() {
    const { authenticate } = useContext(AuthContext)
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [validationError, setValidationError] = useState('')


    const attemptLogin = () => {
        if (!nameRef.current?.value || !emailRef.current?.value) {
            setValidationError('please enter your name and email')
            return
        }

        if (authenticate) {
            authenticate({
                name: nameRef.current?.value,
                email: emailRef.current?.value
            }).catch((error) => {
                setValidationError('Unable to login. Please try again.')
            })
        }
        else {
            setValidationError('Unable to login. Please refresh the page and try again.')
        }
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
            <div className={`w-96 ${cardBaseStyle}`} onKeyDown={e => { if (e.key === 'Enter') attemptLogin() }}>
                <input ref={nameRef} type='text' placeholder='name' className={textboxStyle} />
                <input ref={emailRef} type='email' placeholder='email' className={textboxStyle} />
                <div id="auth-validation-error" className='text-red-500 h-4'>
                    {validationError}
                </div>
                <Button
                    additionalStyling={interactableColors.proceed}
                    onclick={attemptLogin}
                >
                    Let's see some dogs!
                </Button>
            </div>
        </div>
    )
}