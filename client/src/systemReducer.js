import { useReducer } from 'react'

const systemReducer = (state, action) => {
    if (action.type === 'SET_APPS_LIST') {
        return { ...state, appsList: [...action.payload] }
    }

    if (action.type === 'OPEN_DOCK') {
        return { ...state, isDockShown: true }
    }

    if (action.type === 'OPEN_NC') {
        return { ...state, isNotificationsCenterShown: true }
    }

    if (action.type === 'CLOSE_ALL') {
        return { ...state, isDockShown: false, isNotificationsCenterShown: false }
    }

    throw new Error('system reducer - unknown action type!')
}

export default systemReducer