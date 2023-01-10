import { useEffect, useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import SystemContext from '../functions/SystemContext'
import isAppInList from '../functions/isAppInList'

import AppLoading from './AppLoading'
import FatalError from './FatalError'
import Navbar from './Navbar'
import AppCourtain from './AppCourtain'
import Dock from './Dock'
import NotificationsCenter from './NotificationsCenter'

const ProtectedRoutes = ({ init, reload }) => {
    const { systemState, systemDispatch } = useContext(SystemContext)

    // const link = useLocation()
    // useEffect(() => {
    //     const appSlugFromLink = link.pathname.replace('/', '')

    //     if (isAppInList(appSlugFromLink, systemState.appsList))
    //         systemDispatch({ type: 'SELECT_APP', payload: appSlugFromLink })

    // }, [init])

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

        <AppCourtain
            shown={systemState.isDockShown || systemState.isNotificationsCenterShown}
            closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
        />

        <Dock />

        <NotificationsCenter
            shown={systemState.isNotificationsCenterShown}
            closeAll={() => systemDispatch({ type: 'CLOSE_ALL' })}
        />
    </>
}

export default ProtectedRoutes