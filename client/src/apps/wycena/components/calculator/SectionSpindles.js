import { useState, useEffect, useContext } from 'react'
import AppContext from '../../functions/AppContext'

import Spindle from './Spindle'

import iconPlus from '../../../../img/icon-plus.png'

const SectionSpindles = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const [localSpindles, setLocalSpindles] = useState([])
    useEffect(() => setLocalSpindles(appState.calculator.spindles), [appState.calculator.spindles])

    const handleSetSpindle = (n, spindle) => {
        const nthSpindle = localSpindles[n]
        if (!nthSpindle) return

        let newSpindles = [...localSpindles]
        newSpindles[n] = spindle

        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'spindles', value: newSpindles }
        })
    }

    const handleAddSpindle = () => {
        if (appState.calculator.spindles.length >= appState.config.calculator.spindles.spindlesLimit) return

        let newSpindles = [...localSpindles]
        newSpindles.push({ type: { id: -1 }, montage: { id: -1 }, cnt: 0 })

        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'spindles', value: newSpindles }
        })
    }

    const handleRemove = (n) => {
        const newSpindles = localSpindles.filter((s, nth) => nth !== n)

        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'spindles', value: newSpindles }
        })
    }

    return <div className="row mt-5 m-0">
        <div className="col-12 px-3">
            <h2 className="font-big fw-bold m-0">Wrzeciona:</h2>
        </div>

        <div className="col-12 px-3 mt-4">
            {
                localSpindles.map((spindle, n) => <Spindle
                    key={n}
                    types={appState.config.calculator.spindles.types}
                    montage={appState.config.calculator.spindles.montage}
                    spindle={spindle}
                    count={appState.calculator.spindles.length}
                    setSpindle={spindle => handleSetSpindle(n, spindle)}
                    remove={() => handleRemove(n)}
                />)
            }

            <button
                className={`
                    btn btn-icon-text mt-3
                    ${appState.calculator.spindles.length < appState.config.calculator.spindles.spindlesLimit ?
                        'btn-prim' : 'btn-dis'
                    } 
                `}
                title={appState.calculator.spindles.length < appState.config.calculator.spindles.spindlesLimit ?
                    'Dodaj wrzeciono do listy' : 'Osiągnięto limit liczby wrzecion na głowicę'
                }
                onClick={handleAddSpindle}
            >
                <img src={iconPlus} alt="Dodaj wrzeciono" />

                <span>Dodaj wrzeciono</span>
            </button>
        </div>
    </div>
}

export default SectionSpindles