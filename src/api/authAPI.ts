import { createContext } from "react";
import { BASE_URL } from "../lib/constants";
import { AuthParamsT } from "../lib/types";

// const AuthContext = createContext('unauthorized')

/**
 * An attempt to log into the app
 * @param userCredentials 
 * @returns true if login succeeded, otherwise throw the response's status message
 */
export const login = async (userCredentials: AuthParamsT) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(userCredentials),
        credentials: 'include'
    })
    if (res.ok) {
        return true
    } else {
        throw res.statusText
    }
}

/**
 * An attempt to log out of the app
 */
export const logout = () => {
    fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    }).then(res => {
        if (!res.ok) {
            throw res.statusText
        }
    }).catch(reason => {
        console.log(reason)
    })
}
