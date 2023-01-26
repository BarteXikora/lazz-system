import { useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'

import picError from '../../../img/pic-error.png'

const NoWindow = () => {
    const { systemDispatch } = useContext(WindowContext)

    return <div className="row d-flex align-items-center text-center text-md-start">
        <div className="col-md-4 text-center">
            <img src={picError} alt="Wystąpił błąd!" className='img-fluid' />
        </div>

        <div className="col-md-8">
            <h2 className="font-wrong fw-bold mb-3">Wystąpił błąd!</h2>

            <p>
                Wystapił błąd i nie udało się otworzyć okna.
                Proszę spróbować ponownie, a jeżeli błąd się
                powtórzy - skontaktuj się z administratorem!
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