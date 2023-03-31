import { useState, useEffect } from 'react'
import SelectInput from '../../../../components/SelectInput'

import StepShipment from './StepShipment'

const StepMaterial = () => {
    const _materials = [{ id: 0, name: 'Stal' }, { id: 1, name: 'Aluminium' }]
    const _flatBars = [{ id: 0, name: 'Płaskownik 80' }, { id: 1, name: 'Płaskownik 100' }]
    const _clutches = [{ id: 0, name: 'LAZZONI - na płetwę' }, { id: 1, name: 'Gomad' }]

    const [material, setMaterial] = useState({ id: -1 })
    const [flatBar, setFlatBar] = useState({ id: -1 })
    const [clutch, setClutch] = useState({ id: -1 })
    const [isRear, setIsRear] = useState({ id: -1 })

    const [validate, setValidate] = useState({ ok: false, message: '' })

    useEffect(() => {
        if (material.id === -1) return setValidate({ ok: false, message: 'materiał wykonania głowicy' })

        if (flatBar.id === -1) return setValidate({ ok: false, message: 'płaskownik' })

        if (clutch.id === -1) return setValidate({ ok: false, message: 'sprzęgło i mocowanie' })

        if (isRear.id === -1) return setValidate({ ok: false, message: 'czy jest to głowica tylna' })

        return setValidate({ ok: true, message: '' })

    }, [material, flatBar, clutch, isRear])

    return <>
        <div className="row pb-5 pt-4 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Korpus głowicy:</h2>
            </div>

            <div className="col-6 mt-3 px-3">
                <label>
                    Materiał wykonania głowicy:

                    <SelectInput
                        options={_materials}
                        state={material}
                        setState={setMaterial}
                    />
                </label>
            </div>

            <div className="col-6 mt-3 px-3">
                <label>
                    Płaskownik:

                    <SelectInput
                        options={_flatBars}
                        state={flatBar}
                        setState={setFlatBar}
                    />
                </label>
            </div>

            <div className="col-6 mt-3 px-3">
                <label>
                    Sprzęło i mocowanie:

                    <SelectInput
                        options={_clutches}
                        state={clutch}
                        setState={setClutch}
                    />
                </label>
            </div>

            <div className="col-6 mt-3 px-3">
                <label>
                    Głowica tylna:

                    <SelectInput
                        options={[
                            { id: false, name: 'NIE - nie jest to głowica tylna' },
                            { id: true, name: 'TAK - jest to głowica tylna' }
                        ]}
                        state={isRear}
                        setState={setIsRear}
                    />
                </label>
            </div>
        </div>

        {
            !validate.ok ?

                <div className="row pb-5 m-0">
                    <div className="col-6 px-3">
                        <div className="info-box w-100">
                            <h5 className="font-big fw-bold m-0">
                                Należy wybrać {validate.message}, aby przejść dalej...
                            </h5>
                        </div>
                    </div>
                </div>

                :

                <StepShipment />
        }
    </>
}

export default StepMaterial