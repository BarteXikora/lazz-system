import React, { useState, useEffect, useReducer } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Imports global components:
import LoginForm from './components/LoginForm'
import SelectingApp from './components/SelectingApp'
import AppNotFound from './components/AppNotFound'

import SystemContext from './functions/SystemContext'
import ProtectedRoutes from './components/ProtectedRoutes'

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

    // Creates navigate function:
    const systemNavigate = useNavigate()

    // Initializes app:
    const fetchInitialValues = async () => {
        const initValues = await initialize(systemState.authToken)

        setInitReady(true)
        systemDispatch({ type: 'INIT', payload: initValues })
    }
    useEffect(() => {
        if (!initReady) fetchInitialValues()
    }, [])

    const handleLogIn = async (authToken) => {
        setInitReady(false)

        systemDispatch({ type: 'LOG_IN', payload: authToken })

        await fetchInitialValues()
        systemNavigate('/')
    }

    // Handle reload (reinitialize) system:
    const reloadAfterError = () => {
        setInitReady(false)
        fetchInitialValues()
        systemNavigate('/')
    }

    // Renders this awasome system!
    return <SystemContext.Provider value={{ systemState, systemDispatch }}>
        <Routes>
            {/* Protected routes - available after login: */}
            <Route element={<ProtectedRoutes init={initReady} reload={reloadAfterError} />}>

                {/* Redirects to certain app: */}
                <Route path='/' element={<SelectingApp />} />

                {/* Handles apps routes: */}
                {
                    systemState.appsList.map(({ id, slug, component }) => {
                        return (<Route
                            path={`/${slug}/*`}
                            element={component}
                            key={id}
                        />)
                    })
                }

                {/* Handles 404 */}
                <Route path='*' element={<AppNotFound systemNavigate={systemNavigate} />} />
            </Route>

            {/* Login Form: */}
            <Route path='/login' element={<LoginForm
                login={payload => handleLogIn(payload)}
                apiLink={systemState.apiLink}
            />} />

        </Routes>
    </SystemContext.Provider>
}

// Exports App:
export default App