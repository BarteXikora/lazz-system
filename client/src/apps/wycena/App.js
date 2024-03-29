import { useContext, useReducer } from 'react'

import SystemContext from '../../functions/SystemContext'
import appReducer from './functions/appReducer'
import defaultAppState from './functions/defaultAppState'
import AppContext from './functions/AppContext'

import AppTabs from './components/AppTabs'
import TheCalculator from './components/calculator/TheCalculator'
import TheList from './components/list/TheList'
import ThePrice from './components/price/ThePrice'
import ThePreview from './components/preview/ThePreview'

import windowsSlugs from './functions/windowsSlugs'

const App = () => {
    const { systemState, systemDispatch } = useContext(SystemContext)
    const [appState, appDispatch] = useReducer(appReducer, defaultAppState)

    const openWindow = (slug, data = {}) => {
        const { title, content } = windowsSlugs.find(slug)

        systemDispatch({
            type: 'OPEN_WINDOW',
            payload: { title, content, data }
        })
    }

    return <AppContext.Provider value={{ appState, appDispatch, openWindow }}>
        <div className="scroll-columns h-100">
            <div className="scroll-column scroll-column-list _scroll-column-half">
                <AppTabs />

                {
                    appState.showCalculator ?
                        <TheCalculator />

                        :

                        <TheList />
                }
            </div>

            <div className="scroll-column scroll-column-preview _scroll-column-half section-gray-l">
                {
                    appState.showCalculator ?
                        <ThePrice />

                        :

                        <ThePreview />
                }
            </div>
        </div>
    </AppContext.Provider>
}

export default App