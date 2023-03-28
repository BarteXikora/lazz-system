import { useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'

import picPadlock from '../../../img/pic-padlock.png'

const NoWindow = () => {
    const { systemDispatch } = useContext(WindowContext)

    return <div className="row d-flex align-items-center text-center text-md-start">
        <div className="col-md-4 text-center">
            <img src={picPadlock} alt="Brak uprawnień!" className='img-fluid' />
        </div>

        <div className="col-md-8">
            <h2 className="fw-bold mb-3">Nie posiadasz uprawnień, aby wykonać tę operację!</h2>

            <p>
                Aby uzyskać uprawnienia do tej funkcjonalności skontaktuj się z administratorem.
            </p>
        </div>

        <div className="col-12 text-md-end mt-3 mt-md-0">
            <button className="btn btn-sec" onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}>
                Anuluj
            </button>
        </div>
    </div>
}

export default NoWindow