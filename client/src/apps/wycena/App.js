import { useContext, useReducer } from 'react'

import SystemContext from '../../functions/SystemContext'
import appReducer from './functions/appReducer'
import defaultAppState from './functions/defaultAppState'
import AppContext from './functions/AppContext'

import AppTabs from './components/AppTabs'
import TheCalculator from './components/TheCalculator'
import TheList from './components/TheList'

const App = () => {
    const { systemState, systemDispatch } = useContext(SystemContext)
    const [appState, appDispatch] = useReducer(appReducer, defaultAppState)

    return <AppContext.Provider value={{ appState, appDispatch }}>
        <div className="scroll-columns h-100">
            <div className="scroll-column scroll-column-half">
                <AppTabs />

                {
                    appState.showCalculator ?
                        <TheCalculator />

                        :

                        <TheList />
                }
            </div>

            <div className="scroll-column scroll-column-half section-gray-l">
            </div>
        </div>
    </AppContext.Provider>
}

export default App