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

    const _regions = [
        { id: 0, name: 'Polska' },
        { id: 1, name: 'UE' }
    ]

    return <div className="row section-gray py-4 mt-4 m-0">
        <div className="col-12 px-3">
            <h2 className="font-big fw-bold m-0">Wysyłka:</h2>
        </div>

        <div className="col-6 mt-3">
            <label>
                <span>Region wysyłki:</span>

                <SelectInput
                    options={_regions}
                    state={appState.calculator.shipment}
                    setState={handleSetRegion}
                />
            </label>
        </div>
    </div>
}

export default SectionShipment