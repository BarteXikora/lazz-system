import { useEffect, useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import SystemContext from '../functions/SystemContext'

import AppLoading from './AppLoading'
import FatalError from './FatalError'
import Navbar from './Navbar'
import SystemCourtain from './SystemCourtain'
import Dock from './Dock'
import NotificationsCenter from './NotificationsCenter'
import Window from './Window'

const ProtectedRoutes = ({ init, reload }) => {
    const { systemState, systemDispatch } = useContext(SystemContext)

    // Save app from link, if not logged in:
    const link = useLocation()
    useEffect(() => {
        const appSlugFromLink = link.pathname.replace('/', '')
        localStorage.setItem('current-app', appSlugFromLink)
    }, [])

    if (!init) return <AppLoading />

    if (systemState.error.isError) return <FatalError
        message={systemState.error.message}
        code={systemState.error.code}
        reload={reload}
    />

    if (!systemState.user.loggedIn) return <Navigate to='/login' />

    return <>
        <Navbar
            showDock={() => systemDispatch({ type: 'OPEN_DOCK' })}
            showNC={() => systemDispatch({ type: 'OPEN_NC' })}
        />

        <div className="app-container">
            <Outlet />
        </div>

        <SystemCourtain
            shown={systemState.isDockShown || systemState.isNotificationsCenterShown}
            closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
        />

        <Window />

        <Dock />

        <NotificationsCenter
            shown={systemState.isNotificationsCenterShown}
            closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
        />
    </>
}

export default ProtectedRoutes