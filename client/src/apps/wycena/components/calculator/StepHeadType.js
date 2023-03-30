import { useState } from 'react'

import StepSpindles from './StepSpindles'
import StepAdjustable from './StepAdjustable'
import StepCustom from './StepCustom'

import SelectInput from '../../../../components/SelectInput'

const StepHeadType = () => {
    const headTypes = [
        { id: 0, name: 'Głowica liniowa' },
        { id: 1, name: 'Głowica regulowana' },
        { id: 2, name: 'Głowica specjalna' }
    ]

    const [selectedType, setSelectedType] = useState({ id: -1 })

    return <>
        <div className="row pt-4 pb-5 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Typ głowicy:</h2>
            </div>

            <div className="col-6 px-3 mt-3">
                <SelectInput
                    options={headTypes}
                    state={selectedType}
                    setState={setSelectedType}
                />
            </div>
        </div>

        {
            selectedType.id === -1 ?

                <div className="row pb-5 m-0">
                    <div className="col-6 px-3">
                        <div className="info-box w-100">
                            <h5 className="font-big fw-bold m-0">
                                Należy wybrać typ głowicy, aby przejść dalej...
                            </h5>
                        </div>
                    </div>
                </div>

                :

                selectedType.id === 0 ?

                    <StepSpindles />

                    :

                    selectedType.id === 1 ?

                        <StepAdjustable />

                        :

                        <StepCustom />

        }
    </>
}

export default StepHeadType