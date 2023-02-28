import { useContext } from 'react'
import AppContext from '../functions/AppContext'

import Tab from './Tab'

const AppTabs = () => {
    const { appState, appDispatch } = useContext(AppContext)

    return <div className="sticky-top">
        <div className="tabs-container d-flex align-items-center justify-content-between px-3">
            <h1 className="font-big fw-bold m-0">Wycena głowic:</h1>

            <div>
                <Tab
                    title='Wyceń głowicę'
                    isActive={appState.showCalculator}
                    onClick={() => appDispatch({ type: 'CHANGE_TAB', payload: true })}
                />

                <Tab
                    title='Zapisane wyceny'
                    isActive={!appState.showCalculator}
                    onClick={() => appDispatch({ type: 'CHANGE_TAB', payload: false })}
                />
            </div>
        </div>

        <div className="section-white pt-3">
            <h1 className="font-subtitle fw-bold px-3">
                {
                    appState.showCalculator ?
                        'Kalkulator ceny głowicy:'
                        :
                        'Zapisane wyceny:'
                }
            </h1>

            <hr />
        </div>
    </div>
}

export default AppTabs