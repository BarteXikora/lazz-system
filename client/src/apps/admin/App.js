import { useState, useEffect, useReducer, useContext } from 'react'
import SystemContext from '../../functions/SystemContext'
import AppContext from './functions/AppContext'
import { Routes, Route, Navigate } from 'react-router-dom'

import appReducer from './functions/appReducer'
import defaultAppState from './functions/defaultAppState'

import initialize from './functions/initialize'

import Menu from './components/Menu'
import { LoadingBig } from '../../components/Loading'
import FatalError from '../../components/FatalError'
import AdminUsers from './components/apps/AdminUsers'
import AdminZgloszenia from './components/apps/AdminZgloszenia'

const App = () => {
    const { systemState } = useContext(SystemContext)

    const [appState, appDispatch] = useReducer(appReducer, defaultAppState)
    const [initReady, setInitReady] = useState(false)

    const fetchInitialValues = async () => {
        const initValues = await initialize(systemState.apiLink, systemState.user.authToken)

        setInitReady(true)
        appDispatch({ type: 'INIT', payload: initValues })
    }
    useEffect(() => {
        if (!initReady) fetchInitialValues()
    }, [])

    return <AppContext.Provider value={{ appState, appDispatch, currentUser: systemState.user }}>
        <div className='scroll-columns h-100'>
            <Menu />

            {
                !initReady ?

                    <div className="column-main d-flex justify-content-center align-items-center">
                        <div className="mb-5">
                            <LoadingBig />
                        </div>
                    </div>

                    :

                    appState.error.isError ?

                        <FatalError
                            message={appState.error.message}
                            code={appState.error.code}
                            reload={() => { setInitReady(false); fetchInitialValues() }}
                        />

                        :

                        <div className="column-main">
                            <Routes>
                                <Route path='/' element={<Navigate to='user' />} />

                                <Route path='user' element={<AdminUsers />} />
                                <Route path='zgloszenia' element={<AdminZgloszenia />} />

                                <Route path='*' element={<Navigate to='user' />} />
                            </Routes>
                        </div>
            }
        </div>
    </AppContext.Provider>
}

export default App