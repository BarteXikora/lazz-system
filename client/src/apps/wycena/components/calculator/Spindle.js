import { useState, useEffect } from 'react'

import SelectInput from '../../../../components/SelectInput'

import iconPlus from '../../../../img/icon-plus.png'
import iconMinus from '../../../../img/icon-minus.png'
import iconDelete from '../../../../img/icon-delete.png'

const Spindle = ({ types, montage, spindle, count, setSpindle, remove }) => {
    const [localSpindle, setLocalSpindle] = useState({ type: { id: -1 }, montage: { id: -1 }, cnt: 0 })
    useEffect(() => setLocalSpindle(spindle), [spindle])

    const handleSetType = (type) => {
        setSpindle({ ...localSpindle, type })
    }

    const handleSetMontage = (montage) => {
        setSpindle({ ...localSpindle, montage })
    }

    const handleSetCnt = (cnt) => {
        if (cnt < 0) cnt = 0

        setSpindle({ ...localSpindle, cnt })
    }

    return <div className={`row section-gray-l spindle-container m-0 mb-3 ${spindle.cnt == 0 ? 'spindle-wrong' : ''}`}>
        <div className="col-12 p-0 ps-3 d-flex align-items-center justify-content-between">
            <span className="fw-bold">Wrzeciono</span>

            <button
                className={`btn ${count > 1 ? 'btn-x' : 'btn-dis'} btn-icon-small`}
                title={count > 1 ? 'Usuń wrzeciono z listy' : 'Na liście musi znajdować się przynajmniej jedno wrzeciono'}
                onClick={count > 1 ? remove : null}
            >
                <img src={iconDelete} alt="Usuń wrzeciono z listy" />
            </button>
        </div>

        <div className="col-4 ps-3 px-2 pt-1 pb-4">
            <span>Rodzaj:</span>

            <SelectInput
                options={types}
                state={localSpindle.type}
                setState={handleSetType}
            />
        </div>

        <div className="col-4 px-2 pt-1 pb-4">
            <span>Normalia montażu:</span>

            <SelectInput
                options={montage}
                state={localSpindle.montage}
                setState={handleSetMontage}
            />
        </div>

        <div className="col-4 px-2 pt-1 pb-4">
            <span>Liczba:</span>

            <div className="input-group">
                <button
                    className="btn btn-sec btn-icon-small"
                    onClick={() => handleSetCnt(Number(localSpindle.cnt) - 1)}
                >
                    <img src={iconMinus} alt="Odejmij 1" />
                </button>

                <input
                    type="number"
                    className={`form-control text-end ${localSpindle.cnt == 0 ? 'input-wrong' : ''}`}
                    placeholder="0"
                    value={localSpindle.cnt}
                    onChange={(e) => handleSetCnt(e.target.value)}
                />

                <button
                    className="btn btn-sec btn-icon-small"
                    onClick={() => handleSetCnt(Number(localSpindle.cnt) + 1)}
                >
                    <img src={iconPlus} alt="Dodaj 1" />
                </button>
            </div>
        </div>
    </div>
}

export default Spindle