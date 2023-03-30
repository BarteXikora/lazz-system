import defaultSystemState from './defaultSystemState'
import createAppsArray from './functions/createAppsArray'
import getSystemAppsList from './functions/systemApps'

const systemReducer = (state, action) => {
    if (action.type === 'INIT') {
        const systemApps = getSystemAppsList(action.payload.data.user.admin)

        action.payload.data.appsList = [
            ...action.payload.data.appsList,
            ...systemApps
        ]

        const appsList = createAppsArray(action.payload.data.appsList)

        return {
            ...defaultSystemState,
            ...action.payload.data,
            appsList,
            defaultApp: action.payload.data.defaultApp
        }
    }

    if (action.type === 'LOG_IN') {
        localStorage.setItem('auth-token', action.payload)

        return { ...defaultSystemState, apiLink: state.apiLink, user: { loggedIn: true, authToken: action.payload } }
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
        return { ...state, isDockShown: false, isNotificationsCenterShown: false, window: { isOpen: false } }
    }

    if (action.type === 'SELECT_APP') {
        localStorage.setItem('current-app', action.payload)

        return { ...state, currentApp: action.payload }
    }

    if (action.type === 'OPEN_WINDOW') {
        return {
            ...state,
            window: {
                isOpen: true,
                title: action.payload.title,
                content: action.payload.content,
                data: action.payload.data
            }
        }
    }

    if (action.type === 'CLOSE_WINDOW') {
        return { ...state, window: { ...state.window, isOpen: false } }
    }

    throw new Error(`system reducer - unknown action type (${action.type})!`)
}

export default systemReducer