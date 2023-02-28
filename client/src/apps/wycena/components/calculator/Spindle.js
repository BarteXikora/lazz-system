import SelectInput from '../../../../components/SelectInput'

import iconPlus from '../../../../img/icon-plus.png'
import iconMinus from '../../../../img/icon-minus.png'
import iconDelete from '../../../../img/icon-delete.png'

const Spindle = ({ types, montage, spindle, count }) => {
    console.log(spindle)

    return <div className="row spindle-container m-0 mb-3">
        <div className="col-12 p-0 ps-2 d-flex align-items-center justify-content-between">
            <span className="fw-bold">Wrzeciono</span>

            <button
                className={`btn ${count > 1 ? 'btn-x' : 'btn-dis'} btn-icon-small`}
                title={count > 1 ? 'Usuń wrzeciono z listy' : 'Na liście musi znajdować się przynajmniej jedno wrzeciono'}
            >
                <img src={iconDelete} alt="Usuń wrzeciono z listy" />
            </button>
        </div>

        <div className="col-4 px-2 pt-0 pb-4">
            <span>Rodzaj:</span>

            <SelectInput
                options={types}
                state={spindle.type}
                setState={undefined}
            />
        </div>

        <div className="col-4 px-2 pt-0 pb-4">
            <span>Normalia montażu:</span>

            <SelectInput
                options={montage}
                state={spindle.montage}
                setState={undefined}
            />
        </div>

        <div className="col-4 px-2 pt-0 pb-4">
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
        </div>
    </div>
}

export default Spindle