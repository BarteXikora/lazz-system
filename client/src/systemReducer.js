import defaultSystemState from './defaultSystemState'

const systemReducer = (state, action) => {
    if (action.type === 'INIT') {
        return { ...state, ...action.payload.data }
    }

    if (action.type === 'LOG_IN') {
        localStorage.setItem('auth-token', action.payload.authToken)

        return { ...defaultSystemState, apiLink: state.apiLink, user: { loggedIn: true, ...action.payload } }
    }

    if (action.type === 'LOG_OUT') {
        localStorage.removeItem('auth-token')

        return { ...state, user: { loggedIn: false, id: '', name: '', email: '' } }
    }

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

    throw new Error(`system reducer - unknown action type (${action.type})!`)
}

export default systemReducer