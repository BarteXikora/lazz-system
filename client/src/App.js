import { useReducer } from 'react'

// Imports global components:
import Navbar from './components/Navbar'
import AppCourtain from './components/AppCourtain'
import Dock from './components/Dock'
import NotificationsCenter from './components/NotificationsCenter'

// Adds styles:
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/main.css'

// Imports system reducer:
import systemReducer from './systemReducer'

// Default system state for reducer:
const systemDefaultState = {
    appsList: [],
    notificationsList: [],
    isDockShown: false,
    isNotificationsCenterShown: false
}

// Main app:
const App = () => {
    const [systemState, systemDispatch] = useReducer(systemReducer, systemDefaultState)

    return <>
        <Navbar
            showDock={() => systemDispatch({ type: 'OPEN_DOCK' })}
            showNC={() => systemDispatch({ type: 'OPEN_NC' })}
        />

        {/* Shows courtain if dock or note. center is shown: */}
        <AppCourtain
            shown={systemState.isDockShown || systemState.isNotificationsCenterShown}
            closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
        />

        {/* Shows dock or note. center: */}
        <Dock
            shown={systemState.isDockShown}
            closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
        />

        <NotificationsCenter
            shown={systemState.isNotificationsCenterShown}
            closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
        />
    </>
}

// Exports App:
export default App