import SelectInput from '../../../../components/SelectInput'

import iconSave from '../../../../img/icon-save.png'
import iconDiscount from '../../../../img/icon-discount.png'
import iconEmail from '../../../../img/icon-send.png'

const PricesHeader = () => {
    return <div className="section-gray px-3 py-4">
        <div className="d-flex align-items-center justify-content-between">
            <h1 className="font-subtitle fw-bold m-0">Aktualna wycena głowicy:</h1>

            <div style={{ width: '200px' }}>
                <SelectInput
                    options={[{ id: 'pln', name: 'PLN' }, { id: 'eu', name: 'EU' }]}
                    state={{ id: 'pln' }}
                    setState={null}
                />
            </div>
        </div>

        <div className="mt-3">
            <hr />

            <button className="btn btn-prim btn-icon-text me-4">
                <img src={iconSave} alt="Wyślij e-mail" />

                <span>Zapisz wycenę...</span>
            </button>

            <button className="btn btn-sec btn-icon-text me-2">
                <img src={iconDiscount} alt="Wyślij e-mail" />

                <span>Oblicz rabat</span>
            </button>

            <button className="btn btn-sec btn-icon-text me-2">
                <img src={iconEmail} alt="Wyślij e-mail" />

                <span>Wyślij e-mail</span>
            </button>
        </div>
    </div>
}

export default PricesHeader