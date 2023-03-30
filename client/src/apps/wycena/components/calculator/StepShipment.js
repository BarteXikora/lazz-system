import { useState } from 'react'
import SelectInput from '../../../../components/SelectInput'

import StepBody from './StepBody'

const StepShipment = () => {
    const [shipment, setShipment] = useState({ id: -1 })

    return <>
        <div className="row section-gray pt-4 pb-5 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Region wysyłki:</h2>
            </div>

            <div className="col-6 mt-3 px-3">
                <SelectInput
                    options={[{ id: 0, name: 'Polska' }, { id: 1, name: 'UE' }]}
                    state={shipment}
                    setState={setShipment}
                />
            </div>
        </div>

        {
            shipment.id === -1 ?

                <div className="row pt-4 pb-5 m-0">
                    <div className="col-6 px-3">
                        <div className="info-box w-100">
                            <h5 className="font-big fw-bold m-0">
                                Należy wybrać region wysyłki, aby przejść dalej...
                            </h5>
                        </div>
                    </div>
                </div>

                :

                <StepBody />
        }
    </>
}

export default StepShipment