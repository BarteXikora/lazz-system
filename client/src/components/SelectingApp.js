import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemContext from '../functions/SystemContext'
import selectAppSmart from '../functions/selectAppSmart'

import NoApps from '../components/NoApps'
import AppLoading from './AppLoading'

const SelectingApp = () => {
    const [noApps, setNoApps] = useState(false)
    const { systemState, systemDispatch } = useContext(SystemContext)

    const systemNavigate = useNavigate()

    useEffect(() => {
        const preferedApp = selectAppSmart(
            systemState.appsList,
            systemState.currentApp,
            systemState.defaultApp && systemState.defaultApp.slug
        )

        if (!preferedApp) setNoApps(true)
        else {
            systemDispatch({ type: 'SELECT_APP', payload: preferedApp })

            systemNavigate(`/${preferedApp}`)
        }
    }, [])

    if (noApps) return <NoApps />
    return <AppLoading />
}

export default SelectingApp