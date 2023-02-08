import { useContext } from 'react'
import AppContext from '../functions/AppContext'

import picEmpty from '../../../img/pic-empty.png'
import iconReload from '../img/icon-reload.png'
import iconDelete from '../img/icon-delete.png'

import clearFilters from '../functions/clearFilters'

const ListEmpty = () => {
    const { appDispatch, fetchList } = useContext(AppContext)

    return <div className="mt-5 pt-4 text-center">
        <img src={picEmpty} alt="Wystąpił błąd!" />

        <h2 className="fw-bold font-title font-gray-d mb-3">Lista zgłoszeń jest pusta!</h2>

        <p>
            Jeżeli lista powinna zawierać pozycje, skontaktuj<br />
            się z administratorem systemu!
        </p>

        <div className="d-flex justify-content-center">
            <button
                className="mt-4 mb-2 me-2 btn btn-x btn-icon-text"
                onClick={() => appDispatch({ type: 'UPDATE_FILTERS', payload: clearFilters })}
            >
                <img src={iconDelete} alt="Odśwież" />
                <span>Wyczyść filtry</span>
            </button>

            <button className="mt-4 mb-2 btn btn-prim btn-icon-text" onClick={fetchList}>
                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>
        </div>

    </div>
}

export default ListEmpty