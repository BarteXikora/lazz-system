import SelectInput from '../../../../components/SelectInput'

import iconPlus from '../../../../img/icon-plus.png'
import iconMinus from '../../../../img/icon-minus.png'
import iconDelete from '../../../../img/icon-delete.png'

const Spindle = ({ types, montage, spindle }) => {
    console.log(spindle)

    return <div className="row spindle-container py-3 m-0 p-0">
        <div className="col-6 mb-2">
            <span>Rodzaj:</span>

            <SelectInput
                options={types}
                state={spindle.type}
                setState={undefined}
            />

            <span className='d-block mt-3'>Normalia montażu:</span>

            <SelectInput
                options={montage}
                state={spindle.montage}
                setState={undefined}
            />
        </div>

        <div className="col-6 mb-2">
            <span>Liczba:</span>

            <div class="input-group">
                <button class="btn btn-sec btn-icon-small">
                    <img src={iconMinus} alt="Odejmij 1" />
                </button>

                <input
                    type="number"
                    class="form-control text-end"
                    placeholder="0"
                    value={spindle.cnt}
                />

                <button class="btn btn-sec btn-icon-small">
                    <img src={iconPlus} alt="Dodaj 1" />
                </button>
            </div>

            <span className="d-block mt-3">Operacje:</span>

            <button
                className="btn btn-dis btn-icon-text-small"
                title='Na liście musi pozostać przynajmniej jedno wrzeciono.'
            >
                <img src={iconDelete} alt="Usuń wrzeciono" />
                <span>Usuń z listy</span>
            </button>
        </div>
    </div>
}

export default Spindle