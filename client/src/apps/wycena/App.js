import AppContext from './functions/AppContext'

import TheCalculator from './components/TheCalculator'
import TheSavedList from './components/TheSavedList'

const App = () => {
    return <AppContext.Provider>
        <div className="scroll-columns h-100">
            <div className="scroll-column scroll-column-preview">
                <TheSavedList />
            </div>

            <div className="scroll-column-list">
                <TheCalculator />
            </div>
        </div>
    </AppContext.Provider>
}

export default App