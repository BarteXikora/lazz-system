import { useState, useEffect, useContext } from 'react'
import AppContext from '../../functions/AppContext'

import InputTime from './InputTime'

const SectionTimes = () => {
    const { appState, appDispatch } = useContext(AppContext)
    const [timeSummary, setTimeSummary] = useState('0 min.')

    useEffect(() => {
        const times = appState.calculator.times
        let sum = 0

        for (const [key, value] of Object.entries(times)) sum += value

        const hours = parseInt(sum)
        const minutes = sum % 1 === 0 ? 0 : 30

        let text = ''

        if (hours > 0) text += hours + ' ' + 'godz.'
        if (hours > 0 && minutes > 0) text += ', '
        if (minutes > 0) text += minutes + ' ' + 'min.'

        if (text === '') text = '0 min.'

        setTimeSummary(text)

    }, [appState.calculator.times])

    return <>
        <div className="row mt-4 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0">Czas pracy:</h2>

                <p>
                    Czas zaokrąglany jest do całej połowy godziny.
                </p>
            </div>

            <div className="col-6 px-3 mt-2">
                <label>
                    <span>Czas wykonania projektu:</span>

                    <InputTime
                        value={appState.calculator.times.timeProject}
                        setValue={(val) => appDispatch({
                            type: 'SET_CALCULATOR',
                            payload: { section: 'times', value: { timeProject: val } }
                        })}
                    />
                </label>
            </div>

            <div className="col-6 px-3 px-3 mt-2">
                <label>
                    <span>Czas frezowania:</span>

                    <InputTime
                        value={appState.calculator.times.timeMilling}
                        setValue={(val) => appDispatch({
                            type: 'SET_CALCULATOR',
                            payload: { section: 'times', value: { timeMilling: val } }
                        })}
                    />
                </label>
            </div>

            <div className="col-6 px-3 mt-4">
                <label>
                    <span>Czas pracy tokarki CNC:</span>

                    <InputTime
                        value={appState.calculator.times.timeLathe}
                        setValue={(val) => appDispatch({
                            type: 'SET_CALCULATOR',
                            payload: { section: 'times', value: { timeLathe: val } }
                        })}
                    />
                </label>
            </div>

            <div className="col-6 px-3 mt-4">
                <label>
                    <span>Czas montażu:</span>

                    <InputTime
                        value={appState.calculator.times.timeMontage}
                        setValue={(val) => appDispatch({
                            type: 'SET_CALCULATOR',
                            payload: { section: 'times', value: { timeMontage: val } }
                        })}
                    />
                </label>
            </div>

            <div className="col-12 px-3 mt-4">
                <hr className='mb-1' />

                <div className="text-end font-gray-d">
                    Łączny czas wykonania głowicy: <b>{timeSummary}</b>
                </div>
            </div>
        </div>
    </>
}

export default SectionTimes