import React, {
    useState,
    useEffect
} from "react";


export default function useSetLocalStorage(value) {
    window.localStorage.setItem('inputValue', value)
    return [
        window.innerWidth,
        window.innerHeight
    ]
}