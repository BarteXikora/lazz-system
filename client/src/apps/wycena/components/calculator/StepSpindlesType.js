import { useState } from 'react'
import SelectInput from '../../../../components/SelectInput'

import StepBody from './StepBody'

const StepSpindlesType = () => {
    const _types = [
        { id: 0, name: 'Szybkozłączka - standard' },
        { id: 1, name: 'Wkręcane' },
        { id: 2, name: 'Szybkozłaczka WEKKE' }
    ]

    const [selected, setSelected] = useState({ id: -1 })

    return <>
        <div className="row section-gray pt-3 pb-5 m-0">
            <div className="col-6 px-3">
                <label>
                    Typ wrzeciona:

                    <SelectInput
                        options={_types}
                        state={selected}
                        setState={setSelected}
                    />
                </label>
            </div>
        </div>

        {
            selected.id === -1 ?

                <div className="row mt-4 pb-5 m-0">
                    <div className="col-6 px-3">
                        <div className="info-box w-100">
                            <h5 className="font-big fw-bold m-0">
                                Należy wybrać typ wrzeciona, aby przejść dalej...
                            </h5>
                        </div>
                    </div>
                </div>

                :

                <StepBody />
        }
    </>
}

export default StepSpindlesType