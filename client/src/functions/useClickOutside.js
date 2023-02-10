import { useEffect } from 'react'

const useClickOutside = (ref, callMe) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callMe()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [ref])
}

export default useClickOutside