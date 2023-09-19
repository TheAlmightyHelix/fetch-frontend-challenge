import React, { useContext } from "react";
import { interactableColors } from "../lib/styles";
import Button from "./atomic/Button";
import { AuthContext } from "../hooks/useAuth";

export default function LogoutButton() {
    const { handleLogout } = useContext(AuthContext)

    return (

        <div className='fixed bottom-4 right-8'>
            <Button
                onclick={handleLogout}
                additionalStyling={interactableColors.warning}
            >
                LOGOUT
            </Button>
        </div>
    )
}