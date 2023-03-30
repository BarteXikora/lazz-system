import { useState } from 'react'
import SelectInput from '../../../../components/SelectInput'

import StepBody from './StepBody'

const StepMaterial = () => {
    const _materials = [{ id: 0, name: 'Stal' }, { id: 1, name: 'Aluminium' }]

    const [material, setMaterial] = useState({ id: -1 })

    return <>
        <div className="row section-gray pb-5 pt-4 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Materiał wykonania głowicy:</h2>
            </div>

            <div className="col-6 mt-3 px-3">
                <SelectInput
                    options={_materials}
                    state={material}
                    setState={setMaterial}
                />
            </div>
        </div>

        {
            material.id === -1 ?

                <div className="row mt-4 pb-5 m-0">
                    <div className="col-6 px-3">
                        <div className="info-box w-100">
                            <h5 className="font-big fw-bold m-0">
                                Należy wybrać materiał wykonania głowicy, aby przejść dalej...
                            </h5>
                        </div>
                    </div>
                </div>

                :

                <StepBody />
        }
    </>
}

export default StepMaterial