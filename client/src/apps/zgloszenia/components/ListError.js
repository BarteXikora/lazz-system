import { useState, useEffect } from 'react'
import ButtonLoading from '../../../components/ButtonLoading'

import picError from '../../../img/pic-error.png'
import iconReload from '../img/icon-reload.png'

const ListError = ({ message, code, reload, appState }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleReload = () => {
        if (isLoading) return

        setIsLoading(true)
        reload()
    }

    useEffect(() => setIsLoading(false), [appState.contactsList, appState.error])

    return <div className="mt-md-5 pt-md-4 text-center px-2 px-md-3">
        <img src={picError} alt="Wystąpił błąd!" />

        <h2 className="fw-bold font-title font-wrong">Nie udało się załadować listy!</h2>

        <p>
            {message}
        </p>

        {
            code && <span className="font-gray">Kod błędu: <b>{code}</b></span>
        }

        <div className="d-flex flex-column flex-sm-row justify-content-center">
            <button className="mt-4 btn btn-prim btn-icon-text" onClick={handleReload}>
                {isLoading && <ButtonLoading />}

                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>
        </div>

    </div>
}

export default ListError