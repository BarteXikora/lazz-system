import { useContext } from 'react'
import AppContext from '../functions/AppContext'

import Tab from './Tab'

import iconForm from '../../../img/icon-form.png'
import iconSaved from '../../../img/icon-saved.png'
import iconEraser from '../../../img/icon-eraser.png'

const AppTabs = () => {
    const { appState, appDispatch, openWindow } = useContext(AppContext)

    return <div className="sticky-top">
        <div className="tabs-container d-flex align-items-center justify-content-between px-3">
            <h1 className="font-big fw-bold m-0">Wycena głowic:</h1>

            <div>
                <Tab
                    title='Wyceń głowicę'
                    icon={iconForm}
                    isActive={appState.showCalculator}
                    onClick={() => appDispatch({ type: 'CHANGE_TAB', payload: true })}
                />

                <Tab
                    title='Zapisane wyceny'
                    icon={iconSaved}
                    isActive={!appState.showCalculator}
                    onClick={() => appDispatch({ type: 'CHANGE_TAB', payload: false })}
                />
            </div>
        </div>

        <div className="section-white">
            {
                appState.showCalculator ?
                    <div className="d-flex align-items-center justify-content-between px-3 py-3">
                        <h1 className="font-subtitle fw-bold m-0">
                            Kalkulator ceny głowicy:
                        </h1>

                        <div>
                            <button
                                className="btn btn-sec btn-icon-text-small"
                                onClick={() => openWindow('clearCalculator', { appDispatch })}
                            >
                                <img src={iconEraser} alt="Wyczyść formularz" />

                                <span>Wyczyść formularz</span>
                            </button>
                        </div>
                    </div>

                    :

                    'Zapisane wyceny:'
            }

            <hr className='m-0' />
        </div>
    </div>
}

export default AppTabs