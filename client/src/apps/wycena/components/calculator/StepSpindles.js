import { useState, useEffect } from 'react'
import SelectInput from '../../../../components/SelectInput'

import StepSpindlesType from './StepSpindlesType'
import StepSendMail from './StepSendMail'

import iconPlus from '../../../../img/icon-plus.png'
import iconMinus from '../../../../img/icon-minus.png'

const StepSpindles = () => {
    const [spindleSpacing, setSpindleSpacing] = useState({ id: -1 })
    const [spindlesCnt, setSpindlesCnt] = useState(0)

    useEffect(() => {
        if (spindlesCnt < 0) setSpindlesCnt(0)
        else if (spindlesCnt > 100) setSpindlesCnt(100)
    }, [spindlesCnt])

    return <>
        <div className="row section-gray pt-4 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Wrzeciona:</h2>
            </div>

            <div className="col-6 mt-3 px-3">
                <label>
                    Rozstaw wrzecion:

                    <SelectInput
                        options={[
                            { id: 0, name: 'Standardowy - 32 mm' },
                            { id: 1, name: 'Niestandardowy - inny, niż 32 mm' }
                        ]}
                        state={spindleSpacing}
                        setState={setSpindleSpacing}
                    />
                </label>
            </div>

            <div className="col-6 mt-3 px-3">
                <label>
                    Liczba wrzecion:

                    <div className="input-group">
                        <input
                            type="number"
                            className='form-control text-end'
                            placeholder="0"
                            value={spindlesCnt === 0 ? '' : spindlesCnt}
                            onChange={e => setSpindlesCnt(Number(e.target.value))}
                        />

                        <button
                            className="btn btn-sec btn-icon-small mx-1"
                            onClick={() => setSpindlesCnt(spindlesCnt > 0 ? spindlesCnt - 1 : 0)}
                        >
                            <img src={iconMinus} alt="Odejmij 1" />
                        </button>

                        <button
                            className="btn btn-sec btn-icon-small"
                            onClick={() => setSpindlesCnt(spindlesCnt < 100 ? spindlesCnt + 1 : 100)}
                        >
                            <img src={iconPlus} alt="Dodaj 1" />
                        </button>
                    </div>
                </label>
            </div>

            {
                (spindleSpacing.id !== 0 || spindlesCnt === 0 || spindlesCnt > 25) && <div className='pb-5'></div>
            }
        </div>

        {
            spindleSpacing.id === -1 ?

                <div className="row mt-4 pb-5 m-0">
                    <div className="col-6 px-3">
                        <div className="info-box w-100">
                            <h5 className="font-big fw-bold m-0">
                                Należy wybrać rozstaw wrzecion, aby przejść dalej...
                            </h5>
                        </div>
                    </div>
                </div>

                :

                spindlesCnt <= 0 ?

                    <div className="row mt-4 pb-5 m-0">
                        <div className="col-6 px-3">
                            <div className="info-box w-100">
                                <h5 className="font-big fw-bold m-0">
                                    Należy podać liczbę wrzecion, aby przejść dalej...
                                </h5>
                            </div>
                        </div>
                    </div>

                    :

                    spindleSpacing.id === 0 && spindlesCnt <= 25 ?

                        <StepSpindlesType />

                        :

                        <StepSendMail />
        }
    </>
}

export default StepSpindles