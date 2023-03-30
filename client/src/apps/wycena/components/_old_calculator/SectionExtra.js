import { useState, useEffect, useContext } from 'react'
import AppContext from '../../functions/AppContext'

import SelectInput from '../../../../components/SelectInput'

const SectionExtra = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const [backHead, setBackHead] = useState({ id: false })
    useEffect(
        () => setBackHead({ id: appState.calculator.extra.backHead }),
        [appState.calculator.extra.backHead]
    )

    const handleSetCluth = (value) => {
        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'extra', value: { ...appState.calculator.extra, cluth: value } }
        })
    }

    const handleSetBackHead = (value) => {
        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'extra', value: { ...appState.calculator.extra, backHead: value.id } }
        })
    }

    return <div className="row mt-5 m-0">
        <div className="col-12 px-3">
            <h2 className="font-big fw-bold m-0">Sprzęgło i głowica tylna:</h2>
        </div>

        <div className="col-6 px-3 mt-3">
            <label>
                <span>Sprzęgło i mocowanie:</span>

                <SelectInput
                    options={appState.config.extra.cluthes}
                    state={appState.calculator.extra.cluth}
                    setState={handleSetCluth}
                />
            </label>
        </div>

        <div className="col-6 px-3 mt-3">
            <label>
                <span>Głowica tylna:</span>

                <SelectInput
                    options={[
                        { id: true, name: 'TAK - jest to głowica tylna' },
                        { id: false, name: 'NIE - nie jest to głowica tylna' }
                    ]}
                    state={backHead}
                    setState={handleSetBackHead}
                />
            </label>
        </div>
    </div>
}

export default SectionExtra