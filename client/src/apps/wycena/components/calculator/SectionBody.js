import { useState, useEffect, useContext, useRef } from 'react'
import AppContext from '../../functions/AppContext'

import SelectInput from '../../../../components/SelectInput'

const SectionBody = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const lengthRef = useRef(null)

    const [localLength, setLocalLength] = useState(0)
    useEffect(() => {
        setLocalLength(appState.calculator.body.length)
        console.log('update')

    }, [appState.calculator.body.length])

    const handleSetLength = () => {
        let changedAnything = false
        let value = parseFloat(localLength) || 0

        if (value < 0) {
            changedAnything = true
            value = 0
        }

        if (value % 1 > 0) {
            changedAnything = true
            value = parseInt(value) + 1
        }

        setLocalLength(value)

        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'body', value: { ...appState.calculator.body, length: value } }
        })

        if (changedAnything) {
            lengthRef.current.classList.add('input-validated')

            setInterval(() => {
                lengthRef.current.classList.remove('input-validated')
            }, 1000)
        }
    }

    const handleSetFlatBar = (flatBar) => {
        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'body', value: { ...appState.calculator.body, flatBar } }
        })
    }

    return <div className="row section-gray pt-4 pb-5 mt-5 m-0">
        <div className="col-12 px-3">
            <h2 className="font-big fw-bold m-0 mt-2">Korpus głowicy:</h2>

            <p>
                Długość korpusu zaokrąglana jest w górę do pełnego milimetra.
            </p>
        </div>

        <div className="col-6 px-3 mt-2">
            <label>
                <span>Długość korpusu:</span>

                <div className="input-group" ref={lengthRef}>
                    <input
                        type="number"
                        className='form-control text-end'
                        value={localLength || ''}
                        placeholder='0'
                        onChange={(e) => setLocalLength(e.target.value)}
                        onBlur={handleSetLength}
                    />

                    <div className="input-unit input-unit-end">mm</div>
                </div>

            </label>
        </div>

        <div className="col-6 px-3 mt-2">
            <label>
                <span>Płaskownik:</span>

                <SelectInput
                    options={appState.config.body.flatBars}
                    state={appState.calculator.body.flatBar}
                    setState={handleSetFlatBar}
                />
            </label>
        </div>
    </div>
}

export default SectionBody