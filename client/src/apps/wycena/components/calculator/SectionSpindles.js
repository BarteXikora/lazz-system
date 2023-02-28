import { useContext } from 'react'
import AppContext from '../../functions/AppContext'

import Spindle from './Spindle'

import iconPlus from '../../../../img/icon-plus.png'

const SectionSpindles = () => {
    const { appState, appDispatch } = useContext(AppContext)

    return <div className="row mt-4 m-0">
        <div className="col-12 px-3">
            <h2 className="font-big fw-bold m-0">Wrzeciona:</h2>
        </div>

        <div className="col-12 px-3 mt-3">
            {
                appState.calculator.spindles.map(spindle => <Spindle
                    key={spindle.id}
                    types={appState.config.calculator.spindles.types}
                    montage={appState.config.calculator.spindles.montage}
                    spindle={spindle}
                    count={appState.calculator.spindles.length}
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
            >
                <img src={iconPlus} alt="Dodaj wrzeciono" />

                <span>Dodaj wrzeciono</span>
            </button>
        </div>
    </div>
}

export default SectionSpindles