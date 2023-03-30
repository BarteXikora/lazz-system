import { useContext } from 'react'
import AppContext from '../../functions/AppContext'

import SelectInput from '../../../../components/SelectInput'

const SectionShipment = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const handleSetRegion = (region) => {
        appDispatch({
            type: 'SET_CALCULATOR',
            payload: { section: 'shipment', value: region }
        })
    }

    return <div className="row section-gray pt-4 pb-5 mt-5 m-0">
        <div className="col-12 mt-2 px-3">
            <h2 className="font-big fw-bold m-0">Wysyłka:</h2>
        </div>

        <div className="col-6 px-3 mt-3">
            <label>
                <span>Region wysyłki:</span>

                <SelectInput
                    options={appState.config.shipment}
                    state={appState.calculator.shipment}
                    setState={handleSetRegion}
                />
            </label>
        </div>
    </div>
}

export default SectionShipment