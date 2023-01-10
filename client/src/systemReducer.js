import defaultSystemState from './defaultSystemState'
import createAppsArray from './functions/createAppsArray'

const systemReducer = (state, action) => {
    if (action.type === 'INIT') {
        const appsList = createAppsArray(action.payload.data.appsList)

        return { ...defaultSystemState, ...action.payload.data, appsList }
    }

    if (action.type === 'LOG_IN') {
        localStorage.setItem('auth-token', action.payload)

        return { ...defaultSystemState, apiLink: state.apiLink, user: { ...state.user, loggedIn: true } }
    }

    if (action.type === 'LOG_OUT') {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('current-app')

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

    if (action.type === 'SELECT_APP') {
        localStorage.setItem('current-app', action.payload)

        return { ...state, currentApp: action.payload }
    }

    throw new Error(`system reducer - unknown action type (${action.type})!`)
}

export default systemReducer