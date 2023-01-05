import { useState, useEffect, useReducer } from 'react'

// Imports global components:
import LoginForm from './components/LoginForm'

import { LoadingBig as Loading } from './components/Loading'
import Navbar from './components/Navbar'
import AppCourtain from './components/AppCourtain'
import Dock from './components/Dock'
import NotificationsCenter from './components/NotificationsCenter'

// Adds styles:
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/main.css'

// Imports system reducer:
import systemReducer from './systemReducer'

// Imports initializing function:
import initialize from './functions/initialize'

// Default system state for reducer:
import systemDefaultState from './defaultSystemState'

// Main app:
const App = () => {
    const [initReady, setInitReady] = useState(false)
    const [systemState, systemDispatch] = useReducer(systemReducer, systemDefaultState)

    // Initializes app:
    useEffect(() => {
        const fetchInitialValues = async () => {
            const initValues = await initialize(systemState.authToken)

            setInitReady(true)
            systemDispatch({ type: 'INIT', payload: initValues })
        }

        if (!initReady) fetchInitialValues()
    }, [])

    // __DEV:
    // useEffect(() => {
    //     console.log(systemState)

    // }, [initReady])

    if (initReady) {
        if (!systemState.user.loggedIn && !systemState.error.isError)
            return <LoginForm
                login={payload => systemDispatch({ type: 'LOG_IN', payload })}
                apiLink={systemState.apiLink}
            />

        return <>
            <Navbar
                showDock={() => systemDispatch({ type: 'OPEN_DOCK' })}
                showNC={() => systemDispatch({ type: 'OPEN_NC' })}
            />

            <div className="app-container">
                siema!
            </div>

            {/* Shows courtain if dock or note. center is shown: */}
            < AppCourtain
                shown={systemState.isDockShown || systemState.isNotificationsCenterShown}
                closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
            />

            {/* Shows dock or note. center: */}
            <Dock
                shown={systemState.isDockShown}
                closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}

                logout={() => systemDispatch({ type: 'LOG_OUT' })}
            />

            <NotificationsCenter
                shown={systemState.isNotificationsCenterShown}
                closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
            />
        </>

    }

    // Renders App loading page:
    else return <div
        className="container-xy section-gradient-s d-flex align-items-center justify-content-center"
    >
        <Loading />
    </div>
}

// Exports App:
export default App