import { createContext, useState } from "react"
import { AuthParamsT } from "../lib/types";
import { login, logout } from "../api/authAPI";

type AuthContext = {
    authenticated: boolean
    authenticate?: (userCredentials: AuthParamsT) => Promise<void>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContext>({
    authenticated: false,
    handleLogout: () => { }
})

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false)

    const authenticate = async (credentials: AuthParamsT) => {
        return login(credentials).then(status => {
            setAuthenticated(true)
        })
    }

    const handleLogout = () => {
        logout()
        setAuthenticated(false)
    }

    return { AuthContext, authenticated, authenticate, handleLogout }
}